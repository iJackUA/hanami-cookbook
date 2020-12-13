---
title: 'WebSockets'
lang: en-US
sources: [
]
---

# {{ $page.title }} <Badge text="Hanami: 1.x"/>

## AnyCable

`Gemfile`
```ruby
gem 'anycable'
gem 'litecable'
```

AnyCable server should be installed separately [(anycable-go or erlycable, but anycable-go is supposed for convenience)](https://docs.anycable.io/#/websocket_servers).

Two processes should be started (via Foreman or Docker)
* `anycable-go`
* `bundle exec anycable -r ./config/boot.rb`

## LiteCable

Contains "glue" from Anycable gem to our Ruby app - channels, broadcasting etc.

`/config/initializers/anycable.rb`

``` ruby
LiteCable.anycable!

AnyCable.connection_factory = Web::Sockets::Connection

Anycable.configure do |config|
  # put configs here, if needed
end

AnyCable.capture_exception do |ex|
  Hanami.logger.error "AnyCable error: #{ex.inspect}"
end
```

* Create `sockets` folder in `apps/web`
* Create `apps/web/sockets/connection.rb`
* Implement `Web::Sockets::Connection` class with Auth logic

for example `apps/web/sockets/connection.rb`

```ruby
module Web
  module Sockets
    class Connection < LiteCable::Connection::Base
      identified_by :current_user_id

      def connect
        if jwt_token.present?
          # Implement your own `Authentication.get_user_by_jwt`
          user = Authentication.get_user_by_jwt(token)
          reject_unauthorized_connection unless user
        end
        @current_user_id = user.present? ? user.id : nil
      end

      def disconnect
        Hanami.logger.debug "Disconnected #{@current_user_id}"
      end

      private

      def jwt_token
        header = request.params["token"]
      end
    end
  end
end
```

* Create `ApplicationChannel`

`apps/web/sockets/application_channel.rb`
```ruby
module Web
  module Sockets
    class ApplicationChannel < LiteCable::Channel::Base
    end
  end
end
```

* Implement your own Channels like

```ruby{4,11}
module Web
  module Sockets
    class CommentsChannel < ApplicationChannel
      # Indentifier name - the same to use on the fronend side
      identifier :comments

      def subscribed
        post_id = params['post_id']
        reject unless post_id
        # stream name - the same you publish
        stream_from "comments:post:#{post_id}"
      end
    end
  end
end
```

* Broadcast to this Channel from anywhere in the app

```ruby {7}
# Message could have any format
message = {
  action: :new,
  payload: {user: 1, comment: 'Hello world'}
}

LiteCable.broadcast("comments:post:#{post.uuid}", message)
```

## Connect via JavaScript

* [Install `actioncable` package via NPM](https://www.npmjs.com/package/actioncable) (or download as compiled file).
* Connect to `ws://domain.com/ws?jwt_token=...` via `ActionCable.createConsumer` (`jwt_token` important only for this example, ot identify User, cookie could be used "transparently", read AnyCable docs about Headers pass)
* All other operations are identical to ActionCable, with small differences that [covered by AnyCable docs](https://docs.anycable.io/#/ruby/compatibility)

## AnyCable with Docker
`.env`
```
ANYCABLE_HOST=0.0.0.0
ANYCABLE_PORT=8181
ANYCABLE_PATH=/ws
ANYCABLE_RPC_HOST=anycable-rpc:50051
ANYCABLE_HEADERS=COOKIE,AUTHORIZATION,ORIGIN
ANYCABLE_REDIS_URL=redis://redis:6379/1
ANYCABLE_LOG_LEVEL=info
ANYCABLE_DEBUG=false
```

`docker-compose.yaml`
```yaml
anycable:
  container_name: anycable
  image: anycable/anycable-go:v0.6.0
  command: anycable-go
  working_dir: /web
  ports:
    - 8181:8181
  env_file: .env
  depends_on:
    - redis
    - anycable-rpc

anycable-rpc:
  container_name: anycable_rpc
  image: web:latest
  command: bundle exec anycable -r ./config/boot.rb
  working_dir: /web
  stdin_open: true
  tty: true
  env_file: .env
  volumes:
    - .:/web:cached
    - bundle-cache:/usr/local/bundle:cached
  ports:
    - 50051:50051
  depends_on:
    - redis
  environment:
    # tricky thing `anycable-rpc` needs [::]:50051,
    # while `anycable-go` needs a link to `anycable-rpc:50051` inside the same ENV var
    - ANYCABLE_RPC_HOST="[::]:50051"

redis:
  container_name: redis
  image: redis:4.0-alpine
  env_file: .env
  ports:
    - 6381:6379
  volumes:
    - redis-storage:/data:cached

volumes:
  bundle-cache: null
  redis-storage: null
```
