# setup
setup: 
	docker compose down
	docker compose run --rm frontend sh -c "/.config/frontend.sh"
	docker compose run --rm server sh -c "/.config/server.sh"

# frontend
fe:
	docker compose exec frontend sh

# server
svr:
	docker compose exec server sh

# Docker
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
