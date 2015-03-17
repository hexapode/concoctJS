  pg.vertex = function(x, y) {
    if (IN_SHAPE) {
      IN_SHAPE_X = x;
      IN_SHAPE_Y = y;
      IN_SHAPE = false;
      ctx.moveTo(x,y);
    }
    else {
      ctx.lineTo(x,y);
    }
  }