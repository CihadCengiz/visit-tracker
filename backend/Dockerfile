##############  Build stage  ##############
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

##############  Production stage ##############
FROM node:20-alpine
WORKDIR /app

# Only production modules
COPY package*.json ./
RUN npm ci --omit=dev

# Compiled JS only
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["npm", "start"]
