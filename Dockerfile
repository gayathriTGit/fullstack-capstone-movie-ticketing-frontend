# Stage 1: Build 
FROM node:20-alpine AS builder
WORKDIR /app

#install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG APP_NAME=nms-cinemas-booking
COPY --from=builder /app/dist/${APP_NAME} /usr/share/nginx/html
COPY --from=builder /app/dist/${APP_NAME}/browser /usr/share/nginx/html

EXPOSE 80
