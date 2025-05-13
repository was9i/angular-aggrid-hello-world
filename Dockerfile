# ─── Этап 1: сборка приложения ───────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# копируем только манифесты, ставим ВСЕ deps (т.к. нужен @angular/cli для ng build)
COPY package.json package-lock.json ./
RUN npm ci \
  && npm cache clean --force

# теперь копируем весь исходный код приложения
COPY . .

# билдим в production-режиме
RUN npm run build -- --configuration=production

# после сборки можно «пробросить» только прод-зависимости
RUN npm prune --production

# ─── Этап 2: nginx для отдачи статики ─────────────────────────────
FROM nginx:1.25.4-alpine AS runner

# удалим дефолтный конфиг, если будет свой
RUN rm /etc/nginx/conf.d/default.conf

# копируем наш nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# отдадим собранную статику
COPY --from=builder /app/dist/angular-aggrid-hello-world /usr/share/nginx/html

# выставляем права
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
