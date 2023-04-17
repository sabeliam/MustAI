#!/bin/bash
# Скрипт поднимает локальную инфраструктуру для разработки (т.е. все кроме веб-сервера с бэком)

# connect to local mustai-mongo
docker exec -it mustai-mongo mongo

popd
