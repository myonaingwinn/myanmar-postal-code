<img src="frontend/src/assets/icons/not-compile/postal-code-icon.svg" alt="Icon" width="150" height="150">
<img src="frontend/src/assets/icons/not-compile/postal-code-envelope.svg" alt="Envelope" width="230" height="120">
<img src="frontend/src/assets/icons/not-compile/postal-code-icon-beta.svg" alt="Beta Icon" width="125" height="125">

<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#environment-setting-without-using-docker">
                Environment Setting without using Docker
            </a>
        </li>        
        <li>
            <a href="#environment-setting-using-docker">
                Environment Setting using Docker
            </a>
        </li>
        <li>
            <a href="#troubleshooting">
                Troubleshooting
            </a>
        </li>
    </ol>
</details>

# Environment Setting without using Docker

## Requirements

1. [node](https://nodejs.org)-16 and above
1. [MongoDB](https://www.mongodb.com) account (free)

## Project Setup

### Frontend

#### Install packages

```sh
cd frontend && npm i
```

#### Copy .env file and set your Env data

```sh
cp .env.example .env
```

### Server

#### Install packages

```sh
cd server && npm i
```

#### Copy .env file and set your Env data

You'll need MongoDB configurations. Go [there](https://www.mongodb.com) and create Cluster, DB, etc.,.

```sh
cp .env.example .env
```

## Run

### Frontend

```sh
cd frontend && npm run dev
```

### Server

```sh
cd server && npm run dev
```

# Environment Setting using Docker

## Requirements

1. [Docker](https://www.docker.com/products/docker-desktop)
1. [Make](https://www.gnu.org/software/make)

## Project Setup

```sh
make setup
```

### Set Env data

Set necessary data in both of the following .env files.

- `frontend/.env`

- `server/.env`

## Run

```sh
make up
```

**That's all!**

> Take a look other _Make_ commands in [this](./Makefile) Makefile

# Troubleshooting

If you encounter any issues during the setup or running of the application, you can refer to the following troubleshooting tips:

- Failure of `make setup` command: If the `make setup` command fails, you can try deleting the `node_modules` folder in both the `frontend` and `server` directories. After deleting the folders, run the `make setup` command again.
- CORS error: If you come across a CORS (Cross-Origin Resource Sharing) error, ensure that you have entered the URL of your frontend application in the `ALLOWED_ORIGIN` configuration variable in the `server/.env` file. This allows the server to accept requests from it.

> If you encounter any other bugs or issues while using the application, please help me improve it by opening a new issue [here](https://github.com/myonaingwinn/myanmar-postal-code/issues/new). I appreciate your feedback and will work towards resolving any reported problems.\
> \
> Feel free to reach out if you have any further questions or concerns.
