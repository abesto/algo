define ->
  class DummyI18nDataProvider
    constructor: (@prefix='dummy') ->
      
    get: (language, module, key, data, callback) -> callback "#{@prefix}/#{language}/#{module}/#{key}/#{data}"