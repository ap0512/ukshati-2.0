# Dockerfile for frontend
# Use Node.js version 20.12.1 as base image
FROM node:22.15.0-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies based on package.json
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application when the container starts
CMD ["npm", "start"]
