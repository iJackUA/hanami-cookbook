---
title: Docker
lang: en-US
sources: [

]
---

# {{ $page.title }} <Badge text="Hanami: 1.x"/>

::: tip Docker is not required for Hanami itself or any recipe
This cookbook is full of examples running Hanami and different auxiliary software inside Docker.

I want to emphasize, that if you are not experienced with Docker, please don't be afraid. All recipes would contain plain commands to run on plain Linux machine (I am not sure everything works with Windows or plain OSX).

But running everything inside Docker even for local development purposes brings you reproducibility and environment independence. Also recipes can avoid getting very deep in software prerequisites and setup.
:::

::: danger For local dev usage only!
Any of these Docker setup recipes are **NOT proven or validated to be safe** for Production server usage.
:::

## Basic Docker-ization

Prerequisites:
* You are experienced in Docker (I have no goal to explain all the details. Also, not everything is Docker "best practice", use wisely!)
* You have [*docker-compose-wait*](https://github.com/ufoscout/docker-compose-wait) in your source code folder under `./bin/wait`


`.env`

``` properties{2}
COMPOSE_PROJECT_NAME=hnm
# change `hmn` to you project codename
# it is used as Docker containers prefix for future
WAIT_BEFORE_HOSTS=1
WAIT_SLEEP_INTERVAL=1
```

`Dockerfile`
``` docker
FROM ruby:2.6.2-slim-stretch

RUN apt-get update -qq \
    && mkdir -p /usr/share/man/man1 \
    && mkdir -p /usr/share/man/man7 \
    && apt-get install \
    -y --no-install-recommends git build-essential libpq-dev postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ENV WEB_ROOT /web
RUN mkdir $WEB_ROOT
WORKDIR $WEB_ROOT
```

`docker-compose.yaml`
``` yaml
version: '3.5'
services:
  web:
    container_name: web
    build: .
    command: bash -c "./bin/wait && bundle exec hanami server --server=webrick --host 0.0.0.0"
    env_file: .env
    working_dir: /web
    stdin_open: true
    tty: true
    volumes:
      - .:/web:cached
      - bundle-cache:/usr/local/bundle:cached
    ports:
      - 3000:3000
    depends_on:
      - database
    environment:
      - WAIT_HOSTS=database:5432
    networks:
      - default
      - web


  database:
    container_name: database
    image: postgres:10.3-alpine
    ports:
      - 5433:5432
    env_file: .env
    volumes:
      - .:/web:cached
      - db-data:/var/lib/postgresql/data:cached

  node:
    container_name: node
    image: node:12
    command:
      - /bin/sh
      - '-c'
      - |
        yarn install
        yarn run dev
    working_dir: /web/apps
    ports:
      - 3500:3500
    env_file: .env
    volumes:
      - .:/web:cached

volumes:
  db-data: null
  bundle-cache: null

networks:
  web:
```



## Production

// 2-staged build


## OSX shared volumes perf improvement

// with docker-sync
