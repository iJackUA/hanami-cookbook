---
title: Nested Entity
lang: en-US
sources: [
  'https://github.com/hanami/model/pull/457'
]
---

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
