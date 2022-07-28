FROM node:16-alpine

COPY client ./client
COPY server ./server
COPY package*.json ./
RUN npm install
RUN npm run install:client
RUN npm run install:server

CMD ["npm", "run", "start"]
