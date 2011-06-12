define ['vendor/jquery', 'cs!loadcss'], ($, css) ->
  css 'reset', 'main'
  $('body').append($('<div>').attr('id', 'main').html('Test!'))

