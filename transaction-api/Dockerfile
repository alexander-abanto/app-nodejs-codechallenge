FROM node:20

WORKDIR /transaction-api

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
