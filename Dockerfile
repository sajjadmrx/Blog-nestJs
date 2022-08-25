FROM node:alpine

WORKDIR /usr/blog

COPY . .

RUN npm install pnpm -g; \
    pnpm install

EXPOSE 6000

CMD ["npm","run","start"]