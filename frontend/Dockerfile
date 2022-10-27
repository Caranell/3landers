FROM node:18-alpine

RUN apk add --no-cache git
RUN mkdir -p /home/frontend/app
WORKDIR /home/frontend/app

COPY package.json yarn.lock ./

RUN yarn cache clean --all
RUN yarn install --silent
# RUN yarn build

COPY . .

EXPOSE 3000

# CMD [ "yarn",  "preview" ]