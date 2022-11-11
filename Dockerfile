FROM node:16.16.0

USER root

RUN apt update

ENV PORT=3001

EXPOSE 3001

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD [ "yarn", "run", "dev" ]