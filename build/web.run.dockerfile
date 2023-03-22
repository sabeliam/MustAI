# Используем Node.js в качестве базового образа
FROM node:18

# Устанавливаем зависимости для фронтенда
WORKDIR ../app/frontend
COPY package*.json ./
RUN npm install

# Устанавливаем зависимости для бекенда
WORKDIR ../app/backend
COPY package*.json ./
RUN npm install

# Копируем файлы проекта в контейнер
WORKDIR ../app
COPY . .

# Собираем фронтенд
WORKDIR ../app/frontend
RUN npm run build

# Запускаем бекенд на порту 3000
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
