# Use a Node.js image to build the app
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the production-ready app
RUN npm run build


# Use a lightweight image to serve the app
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the build files from the builder stage
COPY --from=builder /app .

# Expose the production port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
