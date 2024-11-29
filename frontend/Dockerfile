FROM node:lts-buster

RUN useradd -ms /bin/sh -u 1001 app

USER app

WORKDIR /app

COPY --chown=app:app package.json package-lock.json ./

RUN npm install

COPY --chown=app:app . /app

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]
