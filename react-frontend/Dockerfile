FROM node:15-alpine

WORKDIR /home/node

COPY . ./

RUN NODE_OPTIONS=--max_old_space_size=250; npm install

ENTRYPOINT ["npm", "start"]
