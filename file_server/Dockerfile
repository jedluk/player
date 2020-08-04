FROM node:12.18.3-alpine3.9

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY index.js ./
COPY routes.js ./

ENV PORT=${PORT:-8083}
ENV UPLOAD_DIR=${UPLOAD_DIR:-'./uploads'}
ENV CLIENT_DIR=${CLIENT_DIR:-'../client'}

EXPOSE ${PORT}

CMD ["node", "."]