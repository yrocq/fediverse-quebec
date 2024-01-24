FROM node:18-alpine

RUN apk install rsync

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install