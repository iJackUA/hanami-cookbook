---
title: Mailing
lang: en-US
sources: [
  'https://github.com/mailhog/MailHog'
]
---

## MailHog
### Step 1: Installation
- Refer to the steps on [MailHog](https://github.com/mailhog/MailHog#installation)

### Step 2: Configuring Hanami Mailer
```ruby {3,7}
# config/environment.rb
# ...
Hanami.configure do
  environment :development do
    # ...

    mailer do
      delivery :smtp, address: "localhost", port: 1025
    end
  end
end
```

## Mail preview

TODO: http://blog.davydovanton.com/2016/05/21/preview-hanami-emails-in-browser/
