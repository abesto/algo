define ['vendor/jquery', 'loadcss'], ($, css) ->
    class ChainedHashTableWidget
        constructor: (@$container, @model) ->
            @$table = $('<table>')
            @$container.append(@$table)
            $(@model).bind('new-hash', @newHash)

        newHash: (e, hash) =>
            @$table.append(
                $('<tr>').append( $('<td>').html(hash) )
            )


