define ['jquery', './SimpleUpdater'], ($, SU) ->
  class JqueryEventI18nUpdater extends SU
    constructor: (@el, @module, @eventProvider, type) ->
      super @el, @module
      @namespacedType = (one+'.'+@UID for one in type.split(' ')).join(' ')
      @eventProvider.bind @namespacedType, (event, data) => @update(event.type, data)
      
    unregister: ->
      super
      @eventProvider.unbind @namespacedType
      
