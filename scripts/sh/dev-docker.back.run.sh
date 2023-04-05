#!/bin/bash
# Скрипт поднимает локальную инфраструктуру для разработки (т.е. все кроме веб-сервера с бэком)

pushd ../..

COMPOSE_FILE=./build/docker-compose.dev.yml
PROJECT_NAME=mustai

# стопим если уже был запущен
docker compose -f $COMPOSE_FILE -p $PROJECT_NAME down

# запускаем
docker compose -f $COMPOSE_FILE -p $PROJECT_NAME run --rm start-back

popd
