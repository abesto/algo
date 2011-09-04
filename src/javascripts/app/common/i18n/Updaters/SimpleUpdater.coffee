define ['vendor/underscore', 'vendor/jquery', 'app/common/UID', 'app/common/i18n'], 
(_, $, UID, i18n) ->
  class SimpleI18nUpdater
    constructor: (@el) ->
      if _(@el).isString()
        @el = $(@el)
      @UID = UID('i18n-updater')
      
    register: -> i18n.registerUpdater this
    
    unregister: -> i18n.unregisterActor this
  
    update: (@key=@key, @data=@data) ->
      @updateCallback(@el, @key, @data)