FROM node:alpine

WORKDIR /usr/src/api

COPY package*.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn","start:prod"]

