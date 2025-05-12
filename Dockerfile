# Этап 1: Сборка Angular приложения
FROM node:20.11.1-alpine3.19 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем необходимые пакеты безопасности
RUN apk add --no-cache --upgrade apk-tools && \
    apk upgrade --no-cache && \
    apk add --no-cache tini

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости с безопасными настройками
RUN npm ci --only=production --audit=false --fund=false && \
    npm cache clean --force

# Копируем все файлы проекта
COPY . .

# Сборка приложения
RUN npm run build

# Этап 2: Сервер на основе NGINX
FROM nginx:1.25.3-alpine-slim AS runner

# Устанавливаем необходимые пакеты безопасности
RUN apk add --no-cache --upgrade apk-tools && \
    apk upgrade --no-cache && \
    apk add --no-cache tini

# Устанавливаем пользователя без прав root
RUN adduser -D -H -u 101 -s /sbin/nologin nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Копируем сборку приложения из предыдущего этапа
COPY --from=builder /app/dist/angular-aggrid-hello-world /usr/share/nginx/html

# Копируем файл конфигурации NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Устанавливаем правильные разрешения
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx && \
    chmod -R 755 /var/log/nginx

# Открываем порт 80
EXPOSE 80

# Переключаемся на непривилегированного пользователя
USER nginx

# Используем tini как init процесс
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]
