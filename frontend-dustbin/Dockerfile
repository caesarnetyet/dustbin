FROM node:18.15.0-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.21.3-alpine

COPY --from=build /app/dist/frontend-dustbin /usr/share/nginx/html

#copy nginx conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]