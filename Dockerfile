# Build client
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Build server (install dev deps and compile TS)
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json server/package-lock.json* ./
# Install dev deps so tsc/ts-node/typescript are available
RUN npm ci
COPY server/ .
# Run the TypeScript build to produce dist/
RUN npm run build

# Runtime image (production deps only)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy compiled server output
COPY --from=server-build /app/server/dist ./dist
# Copy package.json and install production deps only
COPY server/package*.json ./
RUN npm ci --production

# Copy built client assets into server public folder (adjust if server expects another path)
COPY --from=client-build /app/client/dist ./public

EXPOSE 5050
USER app
CMD ["node", "dist/server.js"]