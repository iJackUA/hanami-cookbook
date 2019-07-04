---
title: Docker
lang: en-US
hanami_ver: ['1.2']
sources: [

]
---

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
