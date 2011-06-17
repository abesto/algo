# Basic idea from http://taitems.tumblr.com/post/549973287/drawing-arrows-in-raphaeljs
define ['vendor/jquery', 'vendor/raphael'], ($, R) ->
  R.fn.line = (x1, y1, x2, y2, arrowProps={}) ->
    arrowProps = $.extend {size:0;filled:true;foot:true;angle:45}, arrowProps

    divisor = 45 / arrowProps.angle
    back = if arrowProps.foot or arrowProps.filled then 'L' else 'M'
    angle = R.deg Math.atan2(x1-x2,y2-y1)
    size = arrowProps.size

    arrowPath = @path("M#{x2} #{y2}L#{x2 - size} #{y2 - size/divisor}#{back}#{x2 - size} #{y2 + size/divisor}L#{x2} #{y2}").rotate((90+angle),x2,y2)
    if arrowProps.filled then arrowPath.attr('fill', 'black')
    linePath = @path("M#{x1} #{y1}L#{x2} #{y2}")
    return @set(linePath,arrowPath)
