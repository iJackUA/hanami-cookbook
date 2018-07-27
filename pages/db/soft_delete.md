---
title: 'Soft delete'
lang: en-US
hanami_ver: ['1.2']
sources: [
  
]
---

## Soft delete

A way to mark record in database as deleted, but not delete it completely (mostly needed for audition and link integrity)

`/lib/common/sql_relation_reading_extension.rb`
```ruby
module ROM::SQL::Relation::Reading

  def not_deleted
    new(dataset.where(deleted_at: nil))
  end

end
```

::: tip
Don't forget to require this file somewhere in `environment.rb`
:::

now you can do queries like this

```ruby
class PostRepository < Hanami::Repository
  def find_by_uuid(uuid)
    posts.where(uuid: uuid).not_deleted.one
  end
```
