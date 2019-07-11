---
title: 'Enum'
lang: en-US
sources: [

]
---

::: tip
Enums are useful to handle types of entites. To store in DB a "magic number" like `0` or `1`, but in application code to use some readable notation like `:image_type`
:::

## Native DB enum support

It is possible to use native Postgre extension `pg_enum` to handle

```ruby
Hanami::Model.migration do
  change do

    extension :pg_enum
    create_enum :posts_types, %w(text image)

    create_table :posts do
      primary_key :id
      column :body, String, null: false
      column :type, 'posts_types', null: false
    end

  end
end
```

Now you can send `:image` symbol to Repository and it would be handled correctly

TODO: more details



## Handling Enums

`Gemfile`
```ruby
gem 'ruby-enum'
```


