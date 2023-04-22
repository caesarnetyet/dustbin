FROM node:18.15.0-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

COPY .env.production ./build/.env

RUN yarn install --production --frozen-lockfile

CMD ["node", "build/server.js"]