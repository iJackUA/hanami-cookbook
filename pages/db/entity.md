---
title: 'Entity'
lang: en-US
sources: [
  
]
---

## Nested object of any class

When you need to transfer different structured data as an attribuyte of an entity

```ruby {3}
class Post < Hanami::Entity
  attributes do
    attribute :embed, Types::Object
  end
end
```

```bash
[1] pry(main)> Post.new(embed: Image.new())
=> #<Post @attributes={:embed=>#<Image>}>
[2] pry(main)> Post.new(embed: Url.new())
=> #<Post @attributes={:embed=>#<Url>}>
```
