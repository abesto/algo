define ['app/common/UID', 'underscore'], (UID, _) ->
  class UIDMap
    constructor: ->
      @_map = {}

    _checkHasUID: (obj) ->
      if _(obj.UID).isUndefined()
        throw 'UIDMap can only work with objects that have a UID property'

    _getUID: (param) ->
      if _(param).isNumber()
        return param
      else
        @_checkHasUID param
        return param.UID

    _checkExists: (uid) ->
      if not @exists(uid)
        throw "No object in UIDMap with UID #{uid}"

    add: (obj) ->
      @_checkHasUID obj
      if @exists(obj)
        throw "Item with UID #{obj.UID} already exists in UIDMap"
      @_map[obj.UID] = obj

    get: (uid) -> 
      @_checkExists uid
      return @_map[uid]

    exists: (param) -> 
      not _(@_map[@_getUID(param)]).isUndefined()

    items: -> _(@_map).values()

    remove: (param) ->
      uid = @_getUID(param)
      @_checkExists uid
      delete @_map[uid]
