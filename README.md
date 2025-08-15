# Payment Form

Коротко: одностраничное приложение (React + TypeScript + Vite) с сервером-эмулятором платёжного провайдера (Node.js + Express). Клиентская часть собирается в статические файлы и обслуживается nginx в Docker, сервер поднимает JSON-RPC метод для старта платежа и поллинг-эндпоинт проверки статуса.

- Client: Vite, React, TypeScript, Tailwind, eslint + prettier
- Server: Node 18, Express, jayson (JSON-RPC), nodemon для локальной разработки
- Docker: мультистейдж для client, отдельный образ для server, docker-compose для локального запуска

## Архитектура и порты

- Server: http://localhost:2050
  - POST /api — JSON-RPC метод `pay` (создаёт платёжную сессию и возвращает pid)
  - GET /pay/check/:pid — проверка статуса (process | ok | fail)
- Client (Docker): http://localhost:8080
- Client (Vite dev): http://localhost:5173 по умолчанию

Структура (ключевое):
- server/ — сервер Express
- client/ — SPA на Vite, сборка в dist и отдача nginx
- docker-compose.yml — поднятие обоих сервисов сразу

## Переменные окружения

Client читает base URL сервера из Vite-переменной:
- VITE_API_BASE_URL — URL сервера, по умолчанию http://localhost:2050 (см. client/.env и src/common/config.ts)

Server читает порт из PORT (по умолчанию 2050).

## Быстрый старт (Docker)

Требуется Docker и Docker Compose.

```bash
# из корня репозитория
docker compose up -d --build

# Client: http://localhost:8080
# Server: http://localhost:2050
```

Остановить и удалить контейнеры:
```bash
docker compose down
```

## Локальный запуск без Docker

1) Server
```bash
cd server
npm ci
npm run dev        # nodemon, PORT=2050 по умолчанию
# либо PROD:
# NODE_ENV=production node src/index.js
```

2) Client
```bash
cd client
cp .env .env.local || true   # при необходимости переопределить VITE_API_BASE_URL
npm ci
npm run dev       # http://localhost:5173
```

## API (схема взаимодействия)

- Создание платёжной сессии (JSON-RPC 2.0)
  - POST http://localhost:2050/api
  - Пример запроса:
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "pay",
      "params": { "pan": "4111111111111111", "expire": "12/29", "cardholder": "JOHN DOE", "cvc": "123" }
    }
    ```
  - Успех:
    ```json
    { "jsonrpc": "2.0", "id": 1, "result": { "pid": "<uuid>" } }
    ```
  - Ошибка валидации/ввода:
    ```json
    { "jsonrpc": "2.0", "id": 1, "error": { "code": 110143, "message": "Bad request" } }
    ```

- Проверка статуса платежа
  - GET http://localhost:2050/pay/check/<pid>
  - Ответы: `{ status: "process" | "ok" | "fail", pid }` или `{ message: "invalid pid" }`

Примечание: статус несколько раз будет `process`, затем один раз `ok` (или при достижении лимита — `fail`).

## Скрипты

Server:
- npm run dev — запуск с nodemon (локальная разработка)

Client:
- npm run dev — дев-сервер Vite
- npm run build — типизация + сборка
- npm run preview — предпросмотр собранного билда
- npm run lint / npm run lint:fix — линтинг ESLint
- npm run format / npm run format:check — форматирование Prettier

## Практики и соглашения

- Конфигурация через .env (Vite-переменные начинаются с VITE_)
- Чистые импорты и типобезопасность: TypeScript повсюду, схема валидации через zod на стороне клиента
- Единый стиль кода: ESLint + Prettier (см. client/eslint.config.js, .prettierrc)
- Изоляция фич: client/src/features/* и общие модули в client/src/common
- Docker-образы: мультистейдж для уменьшения размера и времени деплоя


## Отладка и проблемы

- 404 на клиенте в Docker: проверьте, что клиент доступен по http://localhost:8080 и контейнеры запущены
- CORS: сервер уже возвращает разрешающие заголовки для GET/POST/OPTIONS
- Переменные окружения Vite: изменения .env требуют перезапуска dev-сервера
- Порт 2050 занят: задайте другой PORT для server и обновите VITE_API_BASE_URL
