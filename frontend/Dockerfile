FROM node:lts-buster

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]
