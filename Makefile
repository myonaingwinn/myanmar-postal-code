setup:
	docker compose exec api composer install
	docker compose exec api cp .env.example .env
	docker compose exec api php artisan key:generate
	docker compose exec api php artisan storage:link
	docker compose exec api chmod -R 777 storage bootstrap/cache

app:
	docker compose exec api bash

fe:
	docker run -it --rm -v ./frontend:/frontend -w /frontend node:16-alpine sh

run-fe:

	docker run -it --rm -p 8080:5173 -v ./frontend:/frontend -w /frontend node:16-alpine npm run dev -- --host 0.0.0.0

optimize:
	docker compose exec api php artisan optimize

up:
	docker compose up -d

up-b:
	docker compose up -d --build

down:
	docker compose down --remove-orphans

restart:
	@make down
	@make up

restart-b:
	@make down
	@make up-b
