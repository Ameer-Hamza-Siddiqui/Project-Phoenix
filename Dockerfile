FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Port expose
EXPOSE 5000

# Start server
CMD ["node", "index.js"]