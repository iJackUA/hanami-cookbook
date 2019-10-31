---
title: 'RDBMS via Sequel'
lang: en-US
sources:
---

# Add Sequel gem

`Gemfile`
```ruby
gem 'sequel'
# if using Postgres - optional, but nice performance addition
gem 'sequel_pg', require: 'sequel'
```

# Setup connection

Create `config/sequel_connection.rb`
```ruby
require 'hanami/logger'

log_level = Hanami::Logger::WARN
logger = Hanami::Logger

params = {
  loggers: [ logger.new(level: log_level) ],
  pool_timeout: 10
}

# Setup Global extensions
Sequel.extension(
  :pg_json_ops
)

db_url = "postgresql://#{ENV['POSTGRES_USER']}:#{ENV['POSTGRES_PASSWORD']}@#{ENV['POSTGRES_HOST']}:#{ENV['POSTGRES_PORT']}/#{ENV['POSTGRES_DB']}"
db_url.concat('?sslmode=require') if ENV['POSTGRES_SSL_MODE_ENABLED'].eql?('true')
DB = Sequel.connect(db_url, params)

# Activate Databse extensions if needed
DB.extension(
  :pagination,
  :pg_json,
  :pg_array
)

# setup Sequel plugins
Sequel::Model.plugin :timestamps, force: true, update_on_create: true
Sequel::Model.strict_param_setting = false
```

# ENV variables

This config relies on `ENV` vars to be set by your systems (with Docker Compose put it in `.env` file)

Example values:

```properties
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=development
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_SSL_MODE_ENABLED=false
```

# Silence log messages

`config/sequel_connection.rb`
```ruby
class SilentSequelLogger < Hanami::Logger
  def format_message(severity, datetime, progname, msg)
    return if msg.include?('SELECT "pg_attribute"') || msg.include?('s) SET ')
    (@formatter || @default_formatter).call(severity, datetime, progname, msg)
  end
end

if ENV['HANAMI_ENV'] == 'development'
  log_level = Hanami::Logger::INFO
  logger = SilentSequelLogger
else
  log_level = Hanami::Logger::WARN
  logger = Hanami::Logger
end

params = {
  loggers: [ logger.new(level: log_level) ],
  pool_timeout: 10
}

...
```

# Queries

TBD

# Repositories

TBD
