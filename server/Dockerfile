FROM node:18 As Production

WORKDIR /usr/src/api

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install 


COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start:prod"]  


