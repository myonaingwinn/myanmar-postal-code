setup:
	docker compose exec api composer install
	docker compose exec api php artisan storage:link
	docker compose exec api chmod -R 777 storage bootstrap/cache

app:
	docker compose exec api bash

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