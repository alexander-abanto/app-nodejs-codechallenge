FROM node:20

WORKDIR /anti-fraud-api

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]

