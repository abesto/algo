define ['underscore', 'app/common/UID'],
(_, Registry, UID) ->
  # Initialization
  language = 'en'
  dataProvider = null
  updaters = {}
  updateQueue = []  # Queue while dataProvider is not registered

  update = (params...) ->
    if dataProvider != null
      doUpdate params...
    else
      updateQueue.push params

  doUpdate = ($el, module, key, data) ->
    dataProvider.get language, module, key, data, (string) ->
      nodename = $el[0].nodeName.toUpperCase()
      type = $el[0].type?.toUpperCase()
      if nodename == 'INPUT' and type == 'BUTTON'
        $el.val string
      else
        $el.html string

  return {
    registerUpdater: (updater) ->
      updater.updateCallback = update
      updaters[updater.UID] = updater

    unregisterUpdater: (updater) ->
     delete updater.updateCallback
     delete updaters[updater.UID]

    setLanguage: (llanguage) ->
      language = llanguage
      for uid, updater of updaters
        updater.update()

    createUpdater: (name, params...) ->
      require ['app/common/i18n/Updaters/' + name], (U) ->
        updater = new U(params...)
        updater.register()

    setDataProvider: (name, params...) ->
      require ['app/common/i18n/DataProviders/' + name], (DP) ->
        dataProvider = new DP(params...)
        while updateQueue.length > 0
          doUpdate(updateQueue.pop()...)
  }

