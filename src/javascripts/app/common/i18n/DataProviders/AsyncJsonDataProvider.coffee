define ['vendor/underscore', 'vendor/jquery', 'vendor/jquery/json'], (_, $) ->
  class AsyncJsonI18nDataProvider
    constructor: (@path='/locales') ->
      
    interpolate: (string, data) ->
      if _(string).isUndefined()
        string = key
      for placeholder in _(string.match(/#\{[^}]+\}/g)).unique()
        string = string.replace placeholder, eval('data.' + placeholder[2 .. -2])
      return string
    
    get: (language, module, key, data, callback) ->
      require ['text!' + [@path, language, module].join('/') + '.json'], (txt) =>
        callback @interpolate($.evalJSON(txt)[key], data)