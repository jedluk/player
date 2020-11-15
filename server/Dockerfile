FROM node:12.18.3-alpine3.9

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY src ./
RUN ls /app
EXPOSE ${PORT:-8083}
CMD ["node", "."]