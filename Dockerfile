FROM node:14

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

# Устанавливаем глобально http-server
RUN npm install -g http-server

# Открываем порт 8080
EXPOSE 8080

# Запускаем http-server для раздачи файлов из директории dist
CMD ["http-server", "dist"]