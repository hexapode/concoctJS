/**
 * Concoct!
 */

function Concoct(canvas) {
  var ctx = canvas.getContext('2d');

  var CAN_FILL = true;
  var CAN_STROKE = true;

  function size(w, h) {
    console.log('size', arguments);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    width = w;
    height = h;
  }

  function background(r) {
    console.log('background', arguments);

    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }

    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    ctx.fillRect(0,0, canvas.width, canvas.height);
  }

  function noFill() {
    console.log('noFill', arguments);
    CAN_FILL = false;
  }

  function noStroke() {
    console.log('noStroke', arguments);
    CAN_STROKE = false;
  }

  function point(x, y) {
    console.log('point', arguments);
    if (CAN_FILL) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, 1, 1);
    }
    

  }

  function line(x,y,x2,y2) {
    console.log('line', arguments);
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2, y2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }

  function rect(x,y,w,h) {
    console.log('rect', arguments);
    if (CAN_STROKE) {
      ctx.strokeRect(x,y,w,h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x,y,w,h);
    }
  }

  function stroke(r) {
    CAN_STROKE = true;
    console.log('stroke', arguments);
    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }

    ctx.strokeStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    console.log(ctx.strokeStyle);
  }

  function fill(r) {
    CAN_FILL = true;
    console.log('fill', arguments);
    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }

    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    console.log(ctx.fillStyle);
  }

  function width() {
     console.log('width', arguments);
    return canvas.width;
  }

  function height() {
     console.log('height', arguments);
    return canvas.height;
  }

  var source = canvas.innerHTML;

  // [\[\]\ \(\,\t\n\;\)\*\+\-\/\>\<\=\\]
  source = source.replace(/&lt;/g, '<');
  source = source.replace(/&gt;/g, '>');

  source = function (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    for (var i = 0; i < src.length; ++i) {
      if (TOKENS.indexOf(src[i]) !== -1) {
        if (word === 'width') {
          word = 'width()';
        }
        if (word === 'height') {
          word = 'height()';
        }
        if (word === 'void') {
          word = 'function ';
        }
        if (word === 'int') {
          word = ' ';
        }
        source += word + src[i];
        word = '';
      }
      else {
        word += src[i];
      }
    }
    return source;
  }(source);

  console.log(source);
  var fn = new Function(
    'width',
    'height',
    'size',
    'background',
    'noFill',
    'stroke',
    'point',
    'line',
    'rect',
    'noStroke',
    'fill',
    source += 'var setup; var draw;if(setup) {setup()} if (draw) {window.setInterval(draw, 16)}');

  fn(
    width,
    height,
    size,
    background,
    noFill,
    stroke,
    point,
    line,
    rect,
    noStroke,
    fill
  );
}