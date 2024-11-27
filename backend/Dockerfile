FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}

CMD ["npm", "start"]
