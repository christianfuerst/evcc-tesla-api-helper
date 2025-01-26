# Use Node.js as the base image
FROM node:23.6.1 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:23.6.1-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules


# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
