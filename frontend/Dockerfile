# frontend/Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose frontend port
EXPOSE 5173

# Run in development mode
CMD ["npm", "run", "dev"]
