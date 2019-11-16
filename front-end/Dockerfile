FROM node:10-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --silent
COPY . .
RUN yarn run build

FROM node:10-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
