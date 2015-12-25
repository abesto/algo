define ['qunit', 'app/common/UIDMap'], (T, M) ->
  T.module 'UIDMap',
    setup: ->
      @m = new M

  T.test 'Can add item', ->
    o = {UID: 0, x: 'foo'}
    @m.add o
    T.ok @m.exists o
