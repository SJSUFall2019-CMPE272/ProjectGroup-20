FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent --production
COPY . .
CMD ["npm", "run", "start"]
