---
title: 'WebPack'
lang: en-US
sources: [
]
---

# {{ $page.title }} <Badge text="Hanami: 1.x"/>

## Prerequisites

* WebPack is installed and handled by you
* You run it manually or inside Docker
* WebPack has config for 2 modes: WebpackDevServer and Production assest compilation (to files)
* WebPack Manifest.json is generated
* ENV vars are set up (true/false)
  * USE_WEBPACK_DEV_SERVER
  * USE_WEBPACK_GZIP
* [Dry-Container is being used](./dependencies.md)

## WebPack Manifest

Fragments of possible `webpack.conf`

```js
output: {
  path: path.resolve(__dirname, './public/assets'),
  publicPath: publicPath,
  filename: '[name].[hash].js'
},
// ...
plugins: [
  new ManifestPlugin({
    fileName: '../assets.json'
  })
]
// ...
```

## WebpackManifest parser

```ruby
class WebpackManifest

  attr_accessor :manifest

  def initialize(manifest_path)
    @manifest_path = manifest_path
    @manifest = read_manifest
  end

  def read_manifest
    begin
      file = File.expand_path(@manifest_path)
      file_contents = File.read(file)
    rescue Exception => e
      raise "Error while reading manifest file #{@manifest_path}. Does it exist? Exception details: #{e.message}"
    end

    JSON.parse(file_contents)
  end

  def resolve_entry(name)
    entry = manifest[name]
    if entry.nil?
      raise "File #{name} is not found  in Webpack Manifest"
    end
    entry
  end

end
```

## Register single WebpackManifest instance

```ruby
class Container
  extend Dry::Container::Mixin
  register('webpack_manifest', memoize: true) do
    ::WebpackManifest.new('public/assets.json')
  end
  #...
```

## WebPack View Helper

`apps/web/views/webpack_helpers.rb`
```ruby
module WebpackHelpers

  def javascript_pack_tag(script, use_dev_server=ENV['USE_WEBPACK_DEV_SERVER'], use_gzip=ENV['USE_WEBPACK_GZIP'])
    if use_dev_server == "true"
      url = [ENV['WEBPACK_DEV_SERVER_URL'], 'assets', script].join('/')
    else
      full_path = Container[:webpack_manifest].resolve_entry(script)
      full_path = resolve_gzip_filename(full_path) if use_gzip == "true"
      url = "#{full_path}"
    end
    raw %(<script src="#{url}"></script>)
  end

  def stylesheet_pack_tag(file, use_dev_server=ENV['USE_WEBPACK_DEV_SERVER'], use_gzip=ENV['USE_WEBPACK_GZIP'])
    if use_dev_server == "true"
      url = ""  # do nothing as we consider style to be provided by Webpack Dev Server
    else
      full_path = Container[:webpack_manifest].resolve_entry(file)
      full_path = resolve_gzip_filename(full_path) if use_gzip == "true"
      url = "#{full_path}"
    end
    raw %(<link rel="stylesheet" type="text/css" href="#{url}" media="screen,projection" />)
  end

  def assets_path(file, use_dev_server=ENV['USE_WEBPACK_DEV_SERVER'])
    if use_dev_server == "true"
      [ENV['WEBPACK_DEV_SERVER_URL'], 'assets', file].join('/')
    else
      Container[:webpack_manifest].resolve_entry(file)
    end
  end

  private

  def resolve_gzip_filename(full_path)
    filename_with_hash = [full_path.split('/').last, '.gz'].join
    Container[:webpack_manifest].resolve_entry(filename_with_hash)
  end

end
```

in `application.rb` add

```ruby
view.prepare do
  #...
  require_relative '../web/views/webpack_helpers'
  include WebpackHelpers
end
```

## Use *_pack_tag in Template

`apps/web/templates/application.html.erb`
```erb
<!DOCTYPE html>
<html lang="en">
<head>
  <%= stylesheet_pack_tag 'main.css' %>
</head>
<body>
  <div id="app"></div>
  <%= javascript_pack_tag 'main.js' %>
</body>
</html>
```

:::tip
`main.css/main.js` exact names depends on how you have configured your webpack output
:::
