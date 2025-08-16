FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "server.js"]