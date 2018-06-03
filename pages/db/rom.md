---
title: 'DB: Using ROM features'
lang: en-US
sources: [
  'https://github.com/hanami/model/pull/444'
]
---

# Association modifiers

```ruby {3,7}
class PostRepository < Hanami::Repository
  associations do
    belongs_to :user, as: :author
  end
...
  def get_all_posts
    aggregate(author).as(Post)
  end
end
```

# Nested aggregation

```ruby {4}
class UserRepository < Hanami::Repository
  associations do
    has_many :posts
    has_one :user_profile
  end
end
```

```ruby {7}
class PostRepository < Hanami::Repository
  associations do
    belongs_to :user, as: :author
  end
...
  def get_all_posts
    aggregate(author: :user_profile).as(Post)
  end
end
```


and other ROM.rb features
