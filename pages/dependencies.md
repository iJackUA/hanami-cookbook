---
title: 'Dependencies'
lang: en-US
sources: [

]
---

# Dependencies <Badge text="Hanami: 1.x"/>

## Dry Container + AutoInject

`/config/autoinject.rb`
``` ruby
class Container
  extend Dry::Container::Mixin

  register('webpack_manifest', memoize: true) do
    ::WebpackManifest.new('public/assets.json')
  end

  register('cache', memoize: true) do
    Readthis::Cache.new(
      expires_in: 86400,
      redis: {
        url: ENV['REDIS_URL'],
        driver: :hiredis
      }
    )
  end
end

AutoInject = Dry::AutoInject(Container)
```

`/config/environment.rb`
``` ruby {5}
require 'bundler/setup'
require 'hanami/setup'
require 'hanami/model'
#...
require_relative './autoinject'
#...
```

after that you can access registered instance via
``` ruby
Container[:webpack_manifest]
# call methods etc.
Container[:webpack_manifest].resolve_entry(script)
```

## Stub component in Tests

Imagine you have PubNub WebSockets dependency registered.

`/config/autoinject.rb`
```ruby
class Container
  extend Dry::Container::Mixin

#...
  register('pubnub') do
    pubnub_params = {
      subscribe_key: ENV['PUBNUB_SUBSCRIBE_KEY'],
      publish_key: ENV['PUBNUB_PUBLISH_KEY'],
      secret_key: ENV['PUBNUB_SECRET_KEY'],
      ssl: true
    }
    Pubnub.new(pubnub_params)
  end
#...

end

AutoInject = Dry::AutoInject(Container)
```

And your code is sending PubNub messages allover the app. We definitely do not want to pay crazy bills for sending tons of messages during test runs.
Yeees, maybe your architecture could be a little bit better to have an ability to turn these messages off during tests. But you could even want to make assertions on how much and what messages are being sent.

Add such line in tests configuration

``` ruby {2}
AutoInject.container.enable_stubs!
AutoInject.container.stub('pubnub', PubnubClientStub.new)
```

and implement your Stub class, for example as simple as that.

`/spec/support/pubnub_client_stub.rb`
``` ruby
class PubnubClientStub
  attr_accessor :messages

  def initialize
    @messages = []
  end

  def publish(payload)
    @messages.push(payload)
  end
end
```

This assumes that `publish` is the only public method used. You need to implement all public API of stubbed class.

## Hanami Container usage

// TODO

## Dry System autoloading

https://github.com/davydovanton/dry-system-hanami

```ruby
require 'dry/system/container'
require 'dry/system/hanami'

class Container < Dry::System::Container
  extend Dry::System::Hanami::Resolver

  register_folder! 'project_name/repositories'
  # or with custom resolver
  register_folder! 'project_name/matchers', resolver: ->(k) { k }

  configure
end
```
