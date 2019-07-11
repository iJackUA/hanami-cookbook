---
title: 'WebSockets'
lang: en-US
sources: [
]
---

# {{ $page.title }} <Badge text="Hanami: 1.x"/>

## AnyCable

{{ $page }}

## LiteCable

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


## AnyCable with Docker

``` yaml
```
