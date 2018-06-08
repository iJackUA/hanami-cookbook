---
title: 'Entity'
lang: en-US
sources: [
  'https://github.com/hanami/model/pull/457'
]
---

## Nested Entity

```ruby {4}
class Account < Hanami::Entity
  attributes do
    # ...
    attribute :owner, Types::Entity(UserAuthData)
  end
end
```

`/lib/web/hanami_types.rb`
```ruby {4}
module Hanami::Entity::Types
  def self.JSONBEntity(class_const)
    fn = -> attrs { class_const.new(::Hanami::Utils::Hash.deep_symbolize(attrs)) }
    ::Dry::Types::Constructor.new(class_const, &fn) 
  end
end
```

```ruby {2}
class Account < Hanami::Entity
  attribute :auth_data, Types.JSONBEntity(UserAuthData)
  ...
end
```

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
