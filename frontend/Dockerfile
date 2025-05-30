##############  Build stage  ##############
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Next.js app
RUN npm run build

##############  Production stage ##############
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy what we need from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --production

# Set environment variable
ENV NODE_ENV=production

# Expose Next.js default port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
