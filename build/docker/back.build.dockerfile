FROM node:18-alpine As development
WORKDIR /app

COPY ./app/backend/package.json .
COPY ./app/backend/package-lock.json .

RUN npm ci

COPY ./app/backend .

USER node

# Используем Node.js в качестве базового образа
FROM node:18-alpine as builder
WORKDIR /app

# Для поддержи кэширования шагов вначале в образ копируются наименее изменяемые файлы.
# Это позволяет избегать вызова dotnet restore и npm i при любом изменении исходников.
# Подробнее: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache
COPY ./app/backend/package.json .
COPY ./app/backend/package-lock.json .

COPY --from=development /app/node_modules ./node_modules

# Копирование остальных файлов
COPY ./app/backend .

RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env

# Запускаем приложение
CMD ["node", "dist/main.js"]
