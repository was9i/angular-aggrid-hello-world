# ─── Этап 1: сборка Angular ────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# только prod-зависимости и чистый кэш
COPY package.json package-lock.json ./
RUN npm ci --only=production \
 && npm cache clean --force

# копируем исходники и собираем
COPY . .
RUN npm run build

# ─── Этап 2: nginx для отдачи статики ───────────────────────────────────────
FROM nginx:alpine AS runner

# (опционально) удаляем дефолтный конфиг, если вы поставили свой
RUN rm /etc/nginx/conf.d/default.conf

# копируем ваш nginx.conf (если он у вас есть)
COPY nginx.conf /etc/nginx/nginx.conf

# копируем сборку из builder
COPY --from=builder /app/dist/angular-aggrid-hello-world /usr/share/nginx/html

# выставляем права на статику (nginx в образе сам запустится от пользователя nginx)
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

# CMD по-умолчанию уже запустит nginx в форграунде
CMD ["nginx", "-g", "daemon off;"]
