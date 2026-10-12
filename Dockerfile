FROM node:22-alpine

# Install nginx and pnpm
RUN apk add --no-cache nginx
RUN npm install -g pnpm@11.25.0

WORKDIR /app

# Production behavior: enables the Secure cookie flag and the JWT_SECRET boot check
ENV NODE_ENV=production

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install all dependencies
RUN pnpm install --frozen-lockfile

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