FROM node:12.18.3-alpine3.9

COPY client /client
RUN cd /client && ls && yarn install && yarn build 

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY index.js ./
COPY routes.js ./

ENV PORT=${PORT:-8083}
ENV UPLOAD_DIR=${UPLOAD_DIR:-'./uploads'}
ENV CLIENT_DIR='/client/build'

RUN mkdir ${UPLOAD_DIR}
EXPOSE ${PORT}

CMD ["node", "."]