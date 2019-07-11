---
title: Sidekiq
lang: en-US
sources: [
  'https://github.com/ossboard-org/ossboard/commit/fba522de5471cd8d4d2be103c11ee285cd6f920a'
]
---

## Sidekiq

`Gemfile`
``` ruby {1}
  gem 'sidekiq'
```

`config/sidekiq.rb`
``` ruby
Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

```

run Sidekiq via

``` bash
bundle exec sidekiq -e development -r ./config/boot.rb -C ./config/sidekiq.yml
```

## Running in Docker

## Running workers on app startup

`config/initializers/sidekiq.rb`
``` ruby
Sidekiq.configure_server do |config|
  config.on(:startup) do
      DoSmthAfterSystemStart.perform_async
  end
end

```



## Statistics

## UI
