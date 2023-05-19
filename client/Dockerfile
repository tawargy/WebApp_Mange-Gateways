FROM node:18 As build

WORKDIR /usr/src/client

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

RUN npm run build



FROM nginx

COPY --from=build /usr/src/client/build /usr/share/nginx/html 


