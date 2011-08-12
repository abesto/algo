define ['vendor/qunit', 'vendor/raphael', 'app/widgets/ChainedHashTable'], (T, R) ->
  T.module 'Widgets: ChainedHashTable',
    setup: ->
      @p = R('testpaper')
    teardown: ->
      @p.remove()

  # Tests for ChainedHashTable should be here.
  # I gave up.