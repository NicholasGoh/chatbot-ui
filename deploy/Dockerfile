FROM node:19-alpine AS dev
RUN apk add curl
WORKDIR /app
ENV VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2VjdXJlLWphY2thbC03MS5jbGVyay5hY2NvdW50cy5kZXYk
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
COPY --from=dev /app/.env.local ./.env.local
RUN apk add curl
CMD ["npm", "start"]
