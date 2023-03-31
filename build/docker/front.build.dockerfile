# Используем Node.js в качестве базового образа
FROM node:18-alpine AS builder
WORKDIR /app

# Для поддержи кэширования шагов вначале в образ копируются наименее изменяемые файлы.
# Это позволяет избегать вызова dotnet restore и npm i при любом изменении исходников.
# Подробнее: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache
COPY ./app/frontend/package.json .
COPY ./app/frontend/package-lock.json .

RUN npm ci

# Копирование остальных файлов
COPY ./app/frontend .

RUN npm run build:ci

FROM nginx:1.15-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

RUN ./nginx.conf

# Перезапись конфигурационных файлов Nginx для работы с Angular
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
