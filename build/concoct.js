/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');

  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;

  var pg = {};
  pg.size = function (w, h) {
   
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    WIDTH = w;
    HEIGHT = h;
  };

  pg.background = function (r) {

    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }

    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    ctx.fillRect(0,0, WIDTH, HEIGHT);
  };

  pg.noFill = function () {
   
    CAN_FILL = false;
  };

  pg.noStroke = function () {
 
    CAN_STROKE = false;
  };

  pg.point = function (x, y) {
  
    if (CAN_FILL) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, 1, 1);
    }
    

  };

  pg.line = function(x,y,x2,y2) {
   
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2, y2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };

  pg.rect = function(x,y,w,h) {
   
    if (CAN_STROKE) {
      ctx.strokeRect(x,y,w,h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x,y,w,h);
    }
  };

  pg.ellipse = function(x,y,w,h) {

    ctx.beginPath();
    ctx.ellipse(x,y,w/2,h/2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };

  pg.stroke = function(r) {
    CAN_STROKE = true;
    r = r | 0;
    
    var g = r;
    var b = r;
    var a = 1.0;

    if (r > 255) {
      b = r & 0x0000ff;
      g = r & 0x00ff00;
      r = r & 0xff0000;
    }

    if (arguments.length == 2) {
      a = 1/ 255 * arguments[1];
    }
    if (arguments.length == 3) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
    }
    if (arguments.length == 4) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
      a = 1 / 255 * arguments[3];
    }
    var color = 'rgba(' + r +',' + g + ',' + b + ', ' + a + ')';

    ctx.strokeStyle = color;
  
  };
 



  pg.fill = function(r) {
    CAN_FILL = true;
    r = r | 0;
    
    var g = r;
    var b = r;
    var a = 1.0;

    if (r > 255) {
      b = r & 0x0000ff;
      g = r & 0x00ff00;
      r = r & 0xff0000;
    }

    if (arguments.length == 2) {
      a = 1/ 255 * arguments[1];
    }
    if (arguments.length == 3) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
    }
    if (arguments.length == 4) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
      a = 1 / 255 * arguments[3];
    }
    var color = 'rgba(' + r +',' + g + ',' + b + ', ' + a + ')';
    ctx.fillStyle = color;
 
  };

  pg.width = function() {
     
    return WIDTH;
  };

  pg.height = function() {
  
    return HEIGHT;
  };

  pg.noSmooth = function() {

  };

  pg.translate = function() {

  };

  pg.createGraphics = function(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    //document.body.appendChild(canvas);
    var pg = PGraphics(canvas);
    return pg;
  };

  pg.image= function(pg, x, y) {
    ctx.drawImage(pg.getCanvas(), x, y);
  };

  pg.getCanvas = function() {
    return canvas;
  };

  pg.beginDraw = function() {

  };

  pg.endDraw = function() {

  };

  return pg;
};function PCompiler (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '-', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    var TYPES = ['void', 'float', 'int', 'PGraphics'];
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
      if (TOKENS.indexOf(src[i]) !== -1 || src.charCodeAt(i) < 33) {


        if (word === 'width') {
          word = 'width()';
        }
        if (word === 'height') {
          word = 'height()';
        }

        if (word === 'mouseX') {
          word = 'mouseX()';
        }
        if (word === 'mouseY') {
          word = 'mouseY()';
        }

        if (TYPES.indexOf(word) !== -1) {
          var next = getNextWordToken(src, i + 1);
          console.log(word, next);

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
    console.log(source);
    return source;
  };

function Concoct(canvas) {
 

  var mainPG = PGraphics(canvas);
  
  /**
   * COMPILER
   */
  var source = canvas.innerHTML;

  // [\[\]\ \(\,\t\n\;\)\*\+\-\/\>\<\=\\]
  source = source.replace(/&lt;/g, '<');
  source = source.replace(/&gt;/g, '>');

  source = PCompiler(source);
  

  /**
   * Loop logic
   */
  var LOOP = true;
  function noLoop() {
    LOOP = false;
  }
 
  function loop() {
    LOOP = true;
  }

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


  var MOUSE = {
    x : 0,
    y : 0
  };

  function mouseX() {
    return MOUSE.x;
  }

  function mouseY() {
    return MOUSE.y;
  }

  var ON_MOUSE_PRESSED = [];
  function ___SetMousePressed(fn) {
    ON_MOUSE_PRESSED.push(fn);
  }

  canvas.addEventListener('mousemove', function(e) {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
  });


  canvas.addEventListener('mousedown', function(e) {
    for (var i = 0; i < ON_MOUSE_PRESSED.length; ++i) {
      ON_MOUSE_PRESSED[i](e.clientX, e.clientY);
    }
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
  });



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
    'ellipse',
    'createGraphics',
    'beginDraw',
    'endDraw',
    'image',
    'noSmooth',
    'translate',
    '___SetLoop',
    '___SetMousePressed',
    'noLoop',
    'loop',
    'redraw',
    'mouseX',
    'mouseY',
    source += 'var setup; var draw; var mousePressed; if(setup) {setup()} if (mousePressed) {___SetMousePressed(mousePressed)} if (draw) {___SetLoop(draw)}');

  fn(
    mainPG.width,
    mainPG.height,
    mainPG.size,
    mainPG.background,
    mainPG.noFill,
    mainPG.stroke,
    mainPG.point,
    mainPG.line,
    mainPG.rect,
    mainPG.noStroke,
    mainPG.fill,
    mainPG.ellipse,
    mainPG.createGraphics,
    mainPG.beginDraw,
    mainPG.endDraw,
    mainPG.image,
    mainPG.noSmooth,
    mainPG.translate,
    ___SetLoop,
    ___SetMousePressed,
    noLoop,
    loop,
    redraw,
    mouseX,
    mouseY
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

