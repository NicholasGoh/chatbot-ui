FROM nginx:1.21.6-alpine
RUN apk add curl certbot certbot-nginx
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
