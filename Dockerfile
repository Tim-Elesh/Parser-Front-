# Используем официальный образ Node.js с нужной версией
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Выполняем сборку проекта
RUN npm run build

RUN npm install -g http-server

EXPOSE 8080

# Запускаем http-server для раздачи файлов из директории dist
CMD ["http-server", "dist"]