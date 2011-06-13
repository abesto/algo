define ['vendor/jquery', 'cs!loadcss', 'cs!hashtables/ChainedHashTable'], ($, css, H) ->
  css 'reset', 'main'
  $('body').append($('<div>').attr('id', 'main').html('Test harom!'))
  h = new H()
  for e in ['add', 'insertItem', 'newHash', 'got', 'gotFirst', 'ready']
    h.bind e, (event, data) ->
      console.log event.type, data

  h.add 1, 'a'
  console.log h