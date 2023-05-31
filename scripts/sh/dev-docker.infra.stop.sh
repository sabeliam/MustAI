#!/bin/bash

pushd ../..

COMPOSE_FILE=./build/docker-compose.dev.yml
PROJECT_NAME=mustai

docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME down

popd
