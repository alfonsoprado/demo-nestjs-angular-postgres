FROM node:20.2.0-alpine3.17

RUN apk --no-cache add curl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["npm", "run"] 
CMD ["start:dev"]