FROM node:16-alpine

WORKDIR /usr/blog

RUN apk add --update --no-cache openssl1.1-compat

COPY package.json ./
COPY pnpm-lock.yaml ./



RUN npm install pnpm -g; \
    pnpm install

COPY . ./


CMD ["npm","run","start"]
