# Dockerfile
FROM node:22-slim

# create destination directory
RUN mkdir -p /build/nuxt-app
WORKDIR /build/nuxt-app

COPY package.json ./

RUN bun install

COPY . .

FROM busybox
RUN bun run build

RUN bun run generate

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]