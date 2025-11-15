# --- Build stage ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Nginx serve stage ---
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Add the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
