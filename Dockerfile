FROM node:10-alpine as builder
WORKDIR /app
COPY front-end/package.json .
COPY front-end/yarn.lock .
RUN yarn install --silent --production=true
COPY front-end .
RUN yarn run build

FROM node:10-alpine
WORKDIR /app
COPY back-end/package*.json ./
RUN npm install --silent --production
COPY back-end .
COPY --from=builder /app/build ./public/
CMD ["npm", "run", "start"]
