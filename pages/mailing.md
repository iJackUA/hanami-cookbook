---
title: Mailing
lang: en-US
sources: [
  'https://github.com/mailhog/MailHog'
]
---

## MailHog
- [MailHog GitHub](https://github.com/mailhog/MailHog)

The benefits of MailHog is its simple installation process as you only need to install it once and it can be use across multiple platforms.

### Step 1: Installation
``` bash
brew update && brew install mailhog
```

### Step 2: Starting up MailHog

``` bash
mailhog
```
By default, this will start up 2 servers:
- HTTP server on port `8025`
  - This starts up the UI view on localhost:8025
- SMTP server on port `1025`

### Step 3: Configuring Hanami Mailer
If you are working with the mailer locally and would like to test it on a `testing` environment, you may want to set your environment to `testing` such that it will retrieve the environment variables from `.env.testing`
- Ensure that your `SMTP_PORT` is set to `1025` or the port number that you have configured
- Ensure that your `SMTP_HOST` is set to `localhost`
```ruby {3,7}
# config/environment.rb
# ...
Hanami.configure do
  environment :testing do
    # ...

    mailer do
      delivery :smtp, address: ENV['SMTP_HOST'], port: ENV['SMTP_PORT']
    end
  end
end
```

## Mail preview

TODO: http://blog.davydovanton.com/2016/05/21/preview-hanami-emails-in-browser/
