FROM node:19-alpine AS dev
RUN apk add curl
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
# RUN npm run build
CMD ["npm", "run", "dev"]

# FROM nginx:1.21.6-alpine AS production
# WORKDIR /app
# COPY --from=dependencies /app/node_modules ./node_modules
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/package*.json ./
# COPY --from=build /app/next.config.js ./next.config.js
# COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js

# # Expose the port the app will run on
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]
