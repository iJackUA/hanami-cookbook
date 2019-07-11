---
title: 'Cache'
lang: en-US
sources: [
]
---

## Cache implementation
Use [**readthis**](https://github.com/sorentwo/readthis) gem as a Cache implemetation.

https://github.com/sorentwo/readthis/blob/master/lib/readthis/cache.rb

## Call raw Redis commands

"Readthis" gem [supports running arbitraty Redis commands](https://github.com/sorentwo/readthis#running-arbitrary-redis-commands)

```ruby
#TODO code example
```
## Cache Repositories

```ruby
class CacheRepository

  include ::AutoInject['client.cache']

  def create_with_id(id, value)
    cache.write(key(id), value)
    value
  end

  ...

end

class PostCacheRepository < CacheRepository

  def create(params)
    post = PostRepository.new.create(params)
    create_with_id("posts:#{post.id}", params)
  end

  ...

end
```
