FROM node:18-alpine

RUN mkdir -p /home/backend/app
WORKDIR /home/backend/app

COPY package.json yarn.lock ./

RUN yarn cache clean --all
RUN yarn install --silent

COPY . .

EXPOSE 3002

CMD [ "node", "index.js" ]
