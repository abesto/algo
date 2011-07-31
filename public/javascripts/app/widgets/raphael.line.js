(function() {
  define(['vendor/jquery', 'vendor/raphael'], function($, R) {
    return R.fn.line = function(x1, y1, x2, y2, arrowProps) {
      var angle, arrowPath, back, divisor, linePath, size;
      if (arrowProps == null) {
        arrowProps = {};
      }
      arrowProps = $.extend({
        size: 0,
        filled: true,
        foot: true,
        angle: 45
      }, arrowProps);
      divisor = 45 / arrowProps.angle;
      back = arrowProps.foot || arrowProps.filled ? 'L' : 'M';
      angle = R.deg(Math.atan2(x1 - x2, y2 - y1));
      size = arrowProps.size;
      arrowPath = this.path("M" + x2 + " " + y2 + "L" + (x2 - size) + " " + (y2 - size / divisor) + back + (x2 - size) + " " + (y2 + size / divisor) + "L" + x2 + " " + y2).rotate(90 + angle, x2, y2);
      if (arrowProps.filled) {
        arrowPath.attr('fill', 'black');
      }
      linePath = this.path("M" + x1 + " " + y1 + "L" + x2 + " " + y2);
      return this.set(linePath, arrowPath);
    };
  });
}).call(this);
