FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm install
# Копируем остальные файлы проекта
COPY . .


EXPOSE 3000
# Команда для запуска контейнера
CMD ["npm", "run", "dev"]
