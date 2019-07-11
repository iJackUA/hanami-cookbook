---
title: 'Paginaton'
lang: en-US
sources: [
  'http://katafrakt.me/2018/06/01/integrating-pagy-with-hanami/'
]
---

## Using ROM pagination plugin

ROM.rb has paginaton plugin available and luckily Anton Davydov has already written an integration of it into Hanami's Repository class

`Gemfile`
```ruby
gem 'hanami-pagination', '~> 0.2.0'
```

then pagination should be enabled per Repo (actually it could be completely automated, but I suppose it is done explicitly to have fine control over Monkey Patching)

`/config/initializers/enable_pagination.rb`
```ruby
PostRepository.enable_pagination!
UserRepository.enable_pagination!
#...
```

after that you can get paginated result

```ruby
 relation = PostRepository.new.filter_somehow(by: param)
 paginated_realtion = relation.per_page(params[:per_page]).page(params[:page])
 # get Pager object
 pager = Hanami::Pagination::Pager.new(paginated_realtion.pager)
 # and query results
 posts = paginated_realtion.to_a
```

Now `pager` variable has a lot of useful info like `total`, `current_page`, etc.

TODO: add link to 'hanami-pagination' gem docs


### Using Pagy gem

TODO: Investigate and try http://katafrakt.me/2018/06/01/integrating-pagy-with-hanami/
