FROM node:18-alpine

RUN apk add rsync

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install