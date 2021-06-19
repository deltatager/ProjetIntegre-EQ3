FROM node:14-alpine

WORKDIR /home/node

COPY . ./

RUN npm install

ENTRYPOINT ["npm", "start"]