define ->
  class DummyI18nDataProvider
    constructor: (@prefix='dummy') ->
      
    get: (language, key, data, callback) -> callback "#{@prefix}/#{language}/#{key}/#{data}"