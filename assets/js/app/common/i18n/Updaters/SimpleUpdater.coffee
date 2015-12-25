define ['underscore', 'jquery', 'app/common/UID', 'app/common/i18n'], 
(_, $, UID, i18n) ->
  class SimpleI18nUpdater
    constructor: (@el, @module, @key) ->
      if _(@el).isString()
        @el = $(@el)
      @UID = UID('i18n-updater')
      
    register: -> 
      i18n.registerUpdater this
      if not _(@key).isUndefined()
        @update()
    
    unregister: -> i18n.unregisterActor this
  
    update: (@key=@key, @data=@data) ->
      if not _(@key).isUndefined()
        @updateCallback(@el, @module, @key, @data)
