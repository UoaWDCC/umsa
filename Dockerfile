FROM node:20-alpine

# Install nginx and pnpm
RUN apk add --no-cache nginx
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install all dependencies
RUN pnpm install

# Copy source
COPY server/ ./server/
COPY client/ ./client/

# Build both
RUN pnpm --filter server build
RUN pnpm --filter client build

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD sh -c "nginx && cd /app/server && node dist/server.js"