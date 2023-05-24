fe:
	docker compose exec frontend sh

svr:
	docker compose exec server sh

up:
	docker compose up -d

up-b:
	docker compose up -d --build

stop:
	docker compose stop

down:
	docker compose down --remove-orphans

restart:
	@make down
	@make up
