# Tidelyne Prep — production image
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY . .
# The database and tutor config live here; mount a persistent volume at /data
ENV DATA_DIR=/data
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
