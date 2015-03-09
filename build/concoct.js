/**
 * Concoct!
 */

function Concoct(canvas) {
  var ctx = canvas.getContext('2d');

  var CAN_FILL = true;
  var CAN_STROKE = true;

  function size(w, h) {
   
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    width = w;
    height = h;
  }

  function background(r) {

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
   
    CAN_FILL = false;
  }

  function noStroke() {
 
    CAN_STROKE = false;
  }

  function point(x, y) {
  
    if (CAN_FILL) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, 1, 1);
    }
    

  }

  function line(x,y,x2,y2) {
   
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
   
    if (CAN_STROKE) {
      ctx.strokeRect(x,y,w,h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x,y,w,h);
    }
  }

  function ellipse(x,y,w,h) {
    ctx.beginPath();
    ctx.ellipse(x,y,w,h, 0, 0, Math.PI * 2, true);
    if (CAN_STROKE) {
      ctx.fill();
    }
    if (CAN_FILL) {
      ctx.stroke();
    }
  }

  function stroke(r) {
    CAN_STROKE = true;
    r = r | 0;
    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
    }

    ctx.strokeStyle = 'rgb(' + r +',' + g + ',' + b + ')';
  
  }

  function fill(r) {
    CAN_FILL = true;
    r = r | 0;
    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
    }

    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    
  }

  function width() {
     
    return canvas.width;
  }

  function height() {
  
    return canvas.height;
  }

  var LOOP = true;
  function noLoop() {
    LOOP = false;
  }
 
  function loop() {
    LOOP = true;
  }



  var source = canvas.innerHTML;

  // [\[\]\ \(\,\t\n\;\)\*\+\-\/\>\<\=\\]
  source = source.replace(/&lt;/g, '<');
  source = source.replace(/&gt;/g, '>');

  source = function (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    var TYPES = ['void', 'float', 'int'];
    var TOKENS_SPACE = [ ' ' , '\n', '\r', '\t'];
    
    function getNextWordToken(src, index) {
      for (var i = index; i < src.length; ++i) {
        if (TOKENS.indexOf(src[i]) !== -1 && TOKENS_SPACE.indexOf(src[i]) === -1) {
          return src[i];
        }
      }
      return ' ';
    }

    for (var i = 0; i < src.length; ++i) {
      if (TOKENS.indexOf(src[i]) !== -1) {


        if (word === 'width') {
          word = 'width()';
        }
        if (word === 'height') {
          word = 'height()';
        }


        if (TYPES.indexOf(word) !== -1) {
          var next = getNextWordToken(src, i + 1);
          console.log(next);
          if (next === '(') {
            word = 'function ';
          }
          else if (next === ')' || next === ',') {
            word = '';
          }
          else {
            word = 'var ';
          }
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

  var loopFn = null;
  function __run() {
    window.requestAnimationFrame(__run);
    if (LOOP) {
      loopFn();
    }
  }

  function ___SetLoop(loop) {
    loopFn = loop;
    loop();
    __run();
  }

  function redraw() {
    loopFn();
  }

  var ON_MOUSE_PRESSED = [];
  function ___SetMousePressed(fn) {
    ON_MOUSE_PRESSED.push(fn);
  }



  canvas.addEventListener('mousedown', function(e) {
    for (var i = 0; i < ON_MOUSE_PRESSED.length; ++i) {
      ON_MOUSE_PRESSED[i](e.clientX, e.clientY);
    }
  });

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
    'noLoop',
    'loop',
    'ellipse',
    'redraw',
    '___SetLoop',
    '___SetMousePressed',
    source += 'var setup; var draw; var mousePressed; if(setup) {setup()} if (mousePressed) {___SetMousePressed(mousePressed)} if (draw) {___SetLoop(draw)}');

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
    fill,
    noLoop,
    loop,
    ellipse,
    redraw,
    ___SetLoop,
    ___SetMousePressed
  );
};/*
  Main
 */

function startConcoct() {
  var canvasList = document.querySelectorAll('canvas');

  
  for (var i = 0; i < canvasList.length; i++) {
    if (canvasList[i].getAttribute("concoct")) {
      new Concoct(canvasList[i]);
    }
  }
}

