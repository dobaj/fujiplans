# syntax=docker/dockerfile:1
ARG PYTHON_VERSION=3.12.6

# Initial build stage, used to install deps
FROM python:${PYTHON_VERSION}-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install build deps
RUN apt-get update && \
    apt-get install -y \
        build-essential \
        libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install them into a virtual environment
COPY requirements.txt .
RUN python -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install --no-cache-dir -r requirements.txt

# Final prod stage, use a slime image for smaller size
FROM python:${PYTHON_VERSION}-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install runtime deps
RUN apt-get update && \
    apt-get install -y \
        libpango-1.0-0 \
        libpangoft2-1.0-0 \
        libharfbuzz-subset0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ARG UID=10001
RUN adduser --disabled-password --uid "${UID}" appuser

# Copy the pre-built virtual environment from the build stage
COPY --from=builder /venv /venv

COPY . .

USER appuser

EXPOSE 8080

# TODO: Remove reload and volumes when deploying
CMD ["/venv/bin/gunicorn", "--bind", "0.0.0.0:8080", "server.wsgi:application", "--workers", "4", "--threads", "4", "--reload"]
