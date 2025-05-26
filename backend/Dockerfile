FROM node:22-alpine

# Working directory
WORKDIR /app

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3001

ENV NODE_ENV=production

CMD [ "yarn", "start:prod" ]