FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4003

CMD ["npm", "start"]