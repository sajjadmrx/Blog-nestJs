FROM node:alpine

WORKDIR /usr/blog

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]