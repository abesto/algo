define ['qunit', 'raphael',
'app/modules/ChainedHashTable/raphael/ChainedHashTableWidget'], (T, R) ->
  T.module 'Widgets: ChainedHashTable',
    setup: ->
      @p = R('testpaper')
    teardown: ->
      @p.remove()

  # Tests for ChainedHashTable should be here.
  # I gave up.
