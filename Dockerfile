# Create builder image with git and node-sass requirements
FROM node:14-alpine AS builder
COPY . ./nginxconfig
WORKDIR /nginxconfig
RUN apk add git
RUN npm install node-sass
RUN npm install
RUN npm run build:prod

# Only use the public nodejs portion for a lightweight container
FROM nginx:1-alpine
COPY --from=builder /nginxconfig/public/ /usr/share/nginx/html
EXPOSE 80
