---
title: 'ROM.rb features'
lang: en-US
sources: [
  'https://github.com/hanami/model/pull/444',
  'https://github.com/hanami/model/issues/477'
]
---

# ROM.rb features

::: danger
Not all ROM.rb features supported! `Hanami::Repository` class hides and cut-out a lot of things like chnagesets, commands etc.

Also Hanami 1.2 depends on ROM 3.0 (while current version is 4.0) - be carefull reading ROM docs, pay attention to version!
:::

## Association modifiers

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

## Nested aggregation

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

## Raw SQL command

Imagine we need to do a very complicated and DB specific query.
Our `posts` table has jsonb `tags` column and we want to find all tags by query.

```ruby{3}
class PostRepository < Hanami::Repository
  def find_tags(query)
    posts.read("SELECT un_tags AS tags FROM posts, unnest(tags) un_tags WHERE un_tags LIKE #{posts.dataset.literal('%'+query+'%')}")
         .limit(5).pluck(:tags).to_a
  end
end
```

We need to call `read` methos on a relation (`posts` in this case) and pass SQL string.

**The good thing** - query composition is still supported (via `.limit(5)` etc.)

**The bad thing** - you need to escape `query` manually (here it is done via Sequel's `dataset.literal` method)

## JOIN and aggregate

Kind-a comple example, but with ROM `join` does not work on `aggregate`.
Imagine we has such a structure of Users + UserProfle and Follow relations. As a result we want to get Followers of user (array of `User` objects) with aggregated `UserProfiles`

```ruby
class UserRepository < Hanami::Repository
  associations do
    has_one :user_profile
    has_many :follows, as: :followers, foreign_key: :follower_id
   end
  #...
end

class FollowRepository < Hanami::Repository
  relations :user_profiles
  associations do
    belongs_to :user, as: :follower_user, foreign_key: :follower_id
  end

  def get_followers(user_id)
    users.combine(:user_profile).join(:followers).where(follows[:user_id].is(user_id)).as(User).order(:id)
  end
#...
end
```

## Add custom chainable query methods

This is how we can add for example `full_join` or `not_deleted` where-like method

`/lib/common/sql_relation_reading_extension.rb`
```ruby
module ROM::SQL::Relation::Reading

  def full_join(*args, &block)
    __join__(__method__, *args, &block)
  end

  def not_deleted
    new(dataset.where(deleted_at: nil))
  end

end
```

::: tip
Don't forget to require this file somewhere in `environment.rb`
:::

now it could be used in Repo methods like

```ruby {3}
class PostRepository < Hanami::Repository
  def find_by_uuid(uuid)
    posts.where(uuid: uuid).not_deleted.one
  end
``

---

TODO: More ROM usage example?
