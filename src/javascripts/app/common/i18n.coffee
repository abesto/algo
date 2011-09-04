define ['vendor/underscore', 'app/common/UID'],
(_, Registry, UID) ->
  # Initialization
  language = 'en'
  dataProvider = null
  updaters = {}

  update = ($el, key, data) ->
    dataProvider.get language, key, data, (string) ->
      nodename = $el[0].nodeName.toUpperCase()
      if nodename == 'INPUT'
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
}
  