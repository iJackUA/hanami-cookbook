---
title: 'Sequel features'
lang: en-US
hanami_ver: ['1.2']
sources: [
  'https://discourse.hanamirb.org/t/possible-to-use-a-sequel-plugin-in-hanami/492'
]
---

## Migration. Data type specification

Hanami Migrations uses almost pure Sequel notation and we can reuse [Sequel data types notation](
http://sequel.jeremyevans.net/rdoc/files/doc/schema_modification_rdoc.html)

```ruby
create_table(:columns_types) do  # database type used
  column :a1, :string            # string
  column :a2, String             # varchar(255)
  column :a3, 'string'           # string
  column :a4, :datetime          # datetime
  column :a5, DateTime           # timestamp
  column :a6, 'timestamp(6)'     # timestamp(6)
end
```

## Database connection tuning

Pass DB connection options (like [these](https://sequel.jeremyevans.net/rdoc/files/doc/opening_databases_rdoc.html)) via connection URL

```bash
postgres://localhost/?max_connections=16
```

## Use Sequel plugins with Hanami

Change `config/environment.rb` file and update `model` configuration block:

```ruby
model do
    adapter :sql, ENV.fetch('DATABASE_URL')
    # ...
    # add your plugins here:
    gateway do |g|
      g.connection.extension(:connection_validator)
      g.connection.pool.connection_validation_timeout = ENV['DATABASE_CONNECTION_VALIDATION_TIMEOUT'] || 30 # seconds
    end
  end
```

## Automatic Timezones conversion

TODO: Investigate options from [http://sequel.jeremyevans.net/rdoc/classes/Sequel/Timezones.html](http://sequel.jeremyevans.net/rdoc/classes/Sequel/Timezones.html)
