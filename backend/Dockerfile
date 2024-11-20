# syntax=docker/dockerfile:1
ARG PYTHON_VERSION=3.12.6
FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libharfbuzz-subset0 \
    && apt-get clean

WORKDIR /app

ARG UID=10001
RUN adduser --disabled-password --uid "${UID}" appuser

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

USER appuser

COPY . .

EXPOSE 8000

CMD python3 manage.py runserver 0.0.0.0:8000
