FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4005

CMD ["npm", "start"]