---
title: 'Entity'
lang: en-US
sources: [
  'https://github.com/hanami/model/pull/457',
  'https://stackoverflow.com/questions/49142802/how-to-update-only-changed-attributes-in-hanami-model/50157021#50157021'
]
---

## Nested Entity

When you specify associations in Repository it automatically defines attribute of an Entity type in corresponding Entity. In case of custom attributes definition you should do it manually

```ruby {4}
class Account < Hanami::Entity
  attributes do
    # ...
    attribute :owner, Types::Entity(UserAuthData)
  end
end
```

::: warning
It does not coerce `owner` attribute JSON data into Entity instance.
Well it tries, but Sequel return JSONHash class that has not compatibe keys format.
:::

## Nested Entity from PostgreSQL JSON column

We can create custom Entity attr Type definition to construct any type of objects

```ruby {2}
class Account < Hanami::Entity
  attribute :auth_data, Types.JSONBEntity(UserAuthData)
  ...
end
```

here for example we prepare JSON data from DB to be passed into construtor of the entity
(in this example `UserAuthData` is also a simple Entity)

`/lib/web/hanami_types.rb`
```ruby {4}
module Hanami::Entity::Types
  def self.JSONBEntity(class_const)
    fn = -> attrs { class_const.new(::Hanami::Utils::Hash.deep_symbolize(attrs)) }
    ::Dry::Types::Constructor.new(class_const, &fn)
  end
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

## Update Entity

Entity is immutable, so you can not do following

```ruby
user = User.new(id: 5, name: "iJackUA")
user.name = "Yevhen"
```

but you can create a new entity with updated attributes

```ruby
user = User.new(id: 5, name: "iJackUA")
user_new = User.new(**user, name: "Yevhen")
```

also, you can omit creating new var and use `update` with old entity object:

```ruby
UserRepository.new.update(user.id, **user, name: 'Yevhen')
```
