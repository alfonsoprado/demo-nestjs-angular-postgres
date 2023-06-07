FROM node:20.2.0-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install

CMD ./wait-for.sh postgres:5432 && npm run typeorm migration:run -- -d src/data-source.ts && npm start