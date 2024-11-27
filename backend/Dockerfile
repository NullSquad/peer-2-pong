FROM node:18

# WORKDIR /usr/src/app
WORKDIR  /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}

CMD ["npm", "start"]
