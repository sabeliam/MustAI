# Используем Node.js в качестве базового образа
FROM node:18
WORKDIR /src

# Для поддержи кэширования шагов вначале в образ копируются наименее изменяемые файлы.
# Это позволяет избегать вызова dotnet restore и npm i при любом изменении исходников.
# Подробнее: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache
COPY ./src/frontend/package.json .
COPY ./src/frontend/package-lock.json .

RUN npm ci

# Копирование остальных файлов
COPY ./src/frontend .

RUN npm run build:prod
