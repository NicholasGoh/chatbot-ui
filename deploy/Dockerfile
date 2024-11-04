FROM node:19-alpine AS dev
RUN apk add curl
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build
CMD ["npm", "run", "dev"]

FROM node:19-alpine AS production
WORKDIR /app
COPY --from=dev /app/node_modules ./node_modules
COPY --from=dev /app/.next ./.next
COPY --from=dev /app/public ./public
COPY --from=dev /app/package*.json ./
COPY --from=dev /app/next.config.js ./next.config.js
COPY --from=dev /app/next-i18next.config.js ./next-i18next.config.js
RUN apk add curl
CMD ["npm", "start"]
