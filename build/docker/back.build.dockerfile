# Используем Node.js в качестве базового образа
FROM node:18 AS builder
WORKDIR /app

# Для поддержи кэширования шагов вначале в образ копируются наименее изменяемые файлы.
# Это позволяет избегать вызова dotnet restore и npm i при любом изменении исходников.
# Подробнее: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache
COPY ./app/backend/package.json .
COPY ./app/backend/package-lock.json .

RUN npm ci

# Копирование остальных файлов
COPY ./app/backend .

RUN npm run build

FROM alpine:latest
WORKDIR /app

COPY --from=builder /app/dist /dist
