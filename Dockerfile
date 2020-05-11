FROM node:14

WORKDIR /srv

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
