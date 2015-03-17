/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';

  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;
  
  var IN_SHAPE = false;
  var IN_SHAPE_X = 0;
  var IN_SHAPE_y = 0;

  var pg = {};
