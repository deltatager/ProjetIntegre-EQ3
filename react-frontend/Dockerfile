FROM node:15-alpine

WORKDIR /home/node

COPY . ./

RUN npm install

ENTRYPOINT ["npm", "start"]