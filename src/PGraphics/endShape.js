  pg.endShape = function(shouldClose) {
    if (shouldClose) {
      ctx.lineTo(IN_SHAPE_X, IN_SHAPE_Y);
    }
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };