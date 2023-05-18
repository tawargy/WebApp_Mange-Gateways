FROM node:18 As Production

WORKDIR /usr/src/client

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .



CMD ["sh", "-c", "npm run start"]  


