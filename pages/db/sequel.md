---
title: 'Sequel features'
lang: en-US
hanami_ver: ['1.2']
sources: [
  
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

Pass DB connection options (like [these](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server)) via connection URL

```bash
postgres://localhost/?max_connections=16
```

## Automatic Timezones conversion

TODO: Investigate options from [http://sequel.jeremyevans.net/rdoc/classes/Sequel/Timezones.html](http://sequel.jeremyevans.net/rdoc/classes/Sequel/Timezones.html)
