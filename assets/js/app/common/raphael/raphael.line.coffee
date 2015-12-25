# Basic idea from http://taitems.tumblr.com/post/549973287/drawing-arrows-in-raphaeljs
define ['jquery', 'raphael'], ($, R) ->
  R.fn.line = (x1, y1, x2, y2, _arrowProps={}, line=null) ->
    arrowProps = $.extend(
        {size:0;filled:true;foot:true;angle:45},
        if line isnt null then line.arrowProps else {},
        _arrowProps
    )

    divisor = 45 / arrowProps.angle
    back = if arrowProps.foot or arrowProps.filled then 'L' else 'M'
    angle = R.deg Math.atan2(x1-x2,y2-y1)
    size = arrowProps.size

    linePathString = "M#{x1} #{y1}L#{x2} #{y2}"
    arrowPathString = "M#{x2} #{y2}L#{x2 - size} #{y2 - size/divisor}#{back}#{x2 - size} #{y2 + size/divisor}L#{x2} #{y2}"
    arrowRotationString = "R#{90+angle},#{x2},#{y2}"

    if line is null
        arrowPath = @path(arrowPathString)
        linePath = @path(linePathString)
        line = @set(linePath, arrowPath)
        if arrowProps.filled then line.attr('fill', 'black')
        line.arrowProps = arrowProps
        line.line = linePath
        line.arrow = arrowPath
    else
        if arrowProps.filled and not line.arrowProps.filled then line.attr('fill', 'black')
        line.arrowProps = arrowProps
        line.line.attr 'path', linePathString
        line.arrow.attr 'path', arrowPathString

    line.arrow.transform arrowRotationString

    return line
