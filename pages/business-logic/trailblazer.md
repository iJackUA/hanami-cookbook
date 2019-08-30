---
title: 'Trailblazer'
lang: en-US
sources: [
]
---

# {{ $page.title }} <Badge text="Hanami: 1.x"/>

`Gemfile`
```ruby
gem 'trailblazer-operation'
```

## Simple Operation

```ruby
module Op
  module Post
    class Create < Trailblazer::Operation
      include ::OperationHelpers

      pass :prepare_params
      step :validate, Output(:failure) => End(:invalid_params)
      step :create

      def prepare_params(ctx, params:, **)
        params[:email].downcase! if params[:text].present?
      end

      def validate(ctx, params:, **)
        sch = Dry::Validation.Form do
          required(:text).filled(min_size?: 255)
        end
        ctx[:validation_result] = sch.call(params)
        ctx[:params] = ctx[:validation_result].to_h
        handle_validation_errors(ctx)
      end

      def create(ctx, params:, **)
        ctx[:model] = PostRepository.new.create(params)
      end
    end
  end
end
```

call it via

```ruby
res = Op::Post::Create.call{text: 'Abc ... more text'}
res.success?
res[:model]  # return exemplar of created Post from Repository
```

## Handle errors

`lib/helpers/operation_helpers.rb`

```ruby {2}
module OperationHelpers
  def add_error(ctx, attr, error)
    ctx[:errors] = ctx[:errors].nil? ? {} : ctx[:errors]
    ctx[:errors][attr] ||= []
    ctx[:errors][attr] << error
    ctx[:errors][attr].flatten!

    # Hacky return false to route operation to :failure track
    # if step is ending on add_error
    false
  end

  def handle_validation_errors(ctx)
    return true if ctx[:validation_result].success?

    errors = ctx[:validation_result].errors
    errors.each do |attr, messages|
      messages.each do |attr, messages|
        add_error(ctx, attr, messages.join(', '))
      end
    end
    false
  end
end
```

`lib/web.rb`
```ruby
require_relative './helpers/operation_helpers'
#...
```

Now inside Operation you can do

```ruby {2,8}
class OpWithError < Trailblazer::Operation
  include ::OperationHelpers

  step :any_step

  def any_step(ctx, **)
    if ctx[:smth_wrong] == true
      add_error(ctx, :some_attr_anme, "Specific error message for this error")
    else
      true
    end
  end
end
```

to get errors after call

```ruby {2}
res = OpWithError.call(smth_wrong: true)
errors = res[:errors]
```

## Custom Macroses

Let's assume you want to reduce manual decorator calls in Operations

```ruby {2,7,9}
class OpWithError < Trailblazer::Operation
  include ::OperationHelpers

  # from this (and the need to duolicate method)
  step :decorate_model
  # to this
  step Macro::Decorate(:model, with: 'UserDecorator')

  def decorate_model(ctx, **)
    ctx[:model] = UserDecorator.new(ctx[:model])
  end
end
```

create `lib/macros/decorate.rb` and require it in `lib/web.rb`

`lib/macros/decorate.rb`
```ruby {5,37,38}
module Macro
  include Trailblazer

  def self.Decorate(entity_context_key, with: nil)
    step = lambda do |ctx, **|
      return if ctx[entity_context_key].blank?

      if with.blank?
        begin
          ctx[entity_context_key] = ctx[entity_context_key].decorate
        rescue NoMethodError => e
          error_msg = "Unable to decorate!\r\nThere should be `decorate` method on decorable or Decorator class passed"
          Hanami.logger.error(error_msg)
          ctx[:errors] ||= {}
          ctx[:errors][:decoration] = error_msg
          return false
        end
      else
        begin
          if with.is_a?(String)
            with = Object.const_get(with)
          else
            with = Object.const_get("::#{with.to_s}")
          end

          ctx[entity_context_key] = with.new(ctx[entity_context_key])
        rescue NameError => e
          error_msg = "Unable to decorate!\r\nPassed Decorator does not exist."
          Hanami.logger.error(error_msg)
          ctx[:errors] ||= {}
          ctx[:errors][:decoration] = error_msg
          return false
        end
      end
    end

    task = Activity::TaskBuilder::Binary(step)
    { task: task, id: "model.decorate" }
  end
```

## Custom Macros with Track change

You can do even more DRY macroses that automatically end up on specified Track in case of error

Explicit Track switch like this

```ruby
step :check_permission, Output(:failure) => End(:fobidden)
```

could be omited with

```ruby
step Macro::CheckPermission
```

```ruby {15}
module Macro
  include Trailblazer

  def self.CheckPermission()
    step = lambda do |ctx, **|
      # decide to return TRUE or FALSE
      # depending on data in CTX
    end

    task = Activity::TaskBuilder::Binary(step)

    {
      task: task,
      id: "check_permission",
      Trailblazer::Activity.Output(Trailblazer::Activity::Left, :failure) => Trailblazer::Activity.End(:forbidden)
    }
  end
end
```

`:forbidden` here sould be changed to anything you want
