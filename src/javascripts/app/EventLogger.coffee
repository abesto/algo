# Patch jQuery to log all events fired via trigger

define ->
  (jQuery) ->
    oldTrigger = jQuery.event.trigger
    jQuery.event.trigger = (event, data, elem) ->
      console.log elem, event, data
      oldTrigger.apply(this, arguments)