---
title: 'Guard reloader'
lang: en-US
sources:
---

# Guard reloader  <Badge text="Hanami: 1.x"/>

## Add Guard instead of Shotgun
Using [https://github.com/hanami/reloader](https://github.com/hanami/reloader)

`Gemfile`
```ruby
# find and remove Shotgun
# gem 'shotgun'
# ...
if ENV['HANAMI_ENV'].eql?('development')
  group :plugins do
    gem "hanami-reloader", "0.2.1"
  end
end

```

Small hack with 'development' env check required to skip reloading in production.
Hanami 2 has correct `hanami-reloader` that respect env.


## Generate Guard config

`bundle exec hanami generate reloader`

or manually create file

`.hanami.server.guardfile`
```ruby
guard 'rack', port: ENV["HANAMI_PORT"], server: 'webrick' do
  watch(%r{^(config|lib|apps)/.*})
end
```

::: tip
Modify Guard rules as you need for your app structure

Also you can add a lot of other Guards to you code
[https://github.com/guard/guard/wiki/Guardfile-DSL---Configuring-Guard](https://github.com/guard/guard/wiki/Guardfile-DSL---Configuring-Guard)
:::

## Start Hanami app with Guard

Use simple command `hanami server`

instead of parametrized like `hanami server --server=webrick --host 0.0.0.0` (this way would throw an error like "Invalid param")

## Customize Guard Rack parameters

You can customize Rack params via [Guard Rack](https://github.com/dblock/guard-rack) options:

* `:cmd` is the command to run to mount the Rack application (default rackup).
* `:host` is the host ip address to run on (default 0.0.0.0).
* `:port` is the port number to run on (default 9292).
* `:environment` is the environment to use (default development).
* `:start_on_start` will start the server when starting Guard (default true).
* `:force_run` kills any process that's holding open the listen port before attempting to (re)start Rack (default false).
* `:daemon` runs the server as a daemon, without any output to the terminal that ran guard (default false).
* `:debugger` runs the server with the debugger enabled (default false). Required ruby-debug gem.
* `:timeout` waits this number of seconds when restarting the Rack server before reporting there's a problem (default 20).
* `:server` serve using server (one of webrick, mongrel or thin).
* `:config` run the specified rackup file (default config.ru).
