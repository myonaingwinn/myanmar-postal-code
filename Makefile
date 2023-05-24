setup:
	docker run -it --rm -p 8080:5173 -v ./frontend:/frontend -w /frontend node:18-alpine npm i && cp .env.example .env
	docker run -it --rm -p 13000:13000 -v ./server:/server -w /server node:18-alpine npm i && cp .env.example .env

fe:
	docker run -it --rm -v ./frontend:/frontend -w /frontend node:18-alpine sh

run-fe:
	docker run -it --rm -p 8080:5173 -v ./frontend:/frontend -w /frontend node:18-alpine npm run dev -- --host 0.0.0.0

run-server:
	docker run -it --rm -p 13000:13000 -v ./server:/server -w /server node:18-alpine npm run dev -- --host 0.0.0.0
