define ['vendor/jquery'], ($) ->
  class CodeListing
    constructor: (@$container) ->
      @$content = $('<pre>').addClass('code-listing')
      @$container.append(@$content)

    display: (codeUri) ->
      $.get('/resources/' + codeUri + '.algo', {}, @format)

    format: (code) =>
      @$content.children().remove()
      $code = $(code)

      # Substitute <variable> tags      
      $code.find('variable').each ->
        $this = $(this)
        $this.replaceWith "<span class=\"variable\" rel=\"#{$this.attr('name')}\">#{$this.attr('name')}</span>"

      # Substitute <state> tags
      $code.find('state').each ->
        $this = $(this)
        $this.replaceWith "<span class=\"state\" rel=\"#{$this.attr('name')}\">#{$this.html()}</span>"

      # Finally add to the container
      @$content.append($code)

    _highlight: ($el, clazz) ->
      @$container.find('.'+clazz).removeClass clazz
      $el.addClass clazz

    _variable: (name) -> @$container.find("span.variable[rel=#{name}]")
    _line: (num) -> @$container.find("span.line[rel=#{num}]")

    colorVariable: (name, color) -> @_variable(name).css
      'color': color
      'font-weight': 'bold'

    uncolorVariable: (name) -> @_variable(name).css
      'color': 'inherit'
      'font-weight': 'normal'

    highlightLine: (num) -> @_highlight @_line(num)

    setStateMachine: (sm) ->
      sm.bind 'transition', (event, data) =>
        console.log event, data, data.eventType, @$container.find("span.state[rel=\"#{data.eventType}\"")
        @$container.find('span.state').css 'font-weight', 'normal' 
        @$container.find("span.state[rel=\"#{data.eventType}\"]").css 'font-weight', 'bold'
