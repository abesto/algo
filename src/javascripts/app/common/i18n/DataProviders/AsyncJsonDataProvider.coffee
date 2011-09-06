define ['vendor/underscore', 'vendor/jquery'], (_, $) ->
  class AsyncJsonI18nDataProvider
    constructor: (@path='/locales') ->
      @cache = {}
      @queue = {}   # Queue while a resource is being loaded; key is the cache key
      
    cacheKey: (language, module) -> language + '.' + module
      
    interpolate: (language, module, key, data) ->
      string = @cache[ @cacheKey(language, module) ][key]
      if _(string).isUndefined()
        string = key
      for placeholder in _(string.match(/#\{[^}]+\}/g)).unique()
        string = string.replace placeholder, eval('data.' + placeholder[2 .. -2])
      return string
    
    get: (language, module, key, data, callback) -> 
      cacheKey = @cacheKey language, module
      # String is in cache, callback
      if not _(@cache[cacheKey]).isUndefined()
        callback @interpolate(language, module, key, data)
      # Not cached yet
      else
        # Are we already downloading this?
        isNewRequest = _(@queue[cacheKey]).isUndefined()
        queueItem = [language, module, key, data, callback]
        if isNewRequest
          @queue[cacheKey] = [queueItem]
        else
          @queue[cacheKey].push queueItem
        # If not, start the download and arrange to process the queue once it's done
        if isNewRequest
          $.getJSON [@path, language, module].join('/') + '.json', (res) =>
            @cache[cacheKey] = res
            for [language, module, key, data, callback] in @queue[cacheKey]
              callback @interpolate(language, module, key, data)
            delete @queue[cacheKey]