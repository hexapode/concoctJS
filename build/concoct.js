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
 
    var c = ctx.fillStyle;
    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fillStyle = c;
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

  pg.triangle = function (x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x1,y1);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };

  pg.arc = function(x,y,w,h,start,stop) {
  
    ctx.beginPath();
    if (Math.abs(start - stop) != Math.PI * 2) {
      ctx.moveTo(x,y);
      ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
      ctx.lineTo(x,y);
    } else {
      ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
    }
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };

  pg.quad = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x4,y4);
    ctx.lineTo(x1,y1);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
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
  console.log('fill', color);
  };

  pg.width = function() {
     
    return WIDTH;
  };

  pg.height = function() {
  
    return HEIGHT;
  };

  pg.noSmooth = function() {
    ctx.imageSmoothingEnabled = false;
  };

  pg.translate = function(x, y) {
    ctx.translate(x, y);
  };

  pg.rotate = function(angle) {
    ctx.rotate(angle);
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

  var IN_SHAPE = false;
  var IN_SHAPE_X = 0;
  var IN_SHAPE_y = 0;
  pg.beginShape = function() {
    IN_SHAPE = true;
    ctx.beginPath();
  };

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

  pg.beginDraw = function() {

  };

  pg.endDraw = function() {

  };

  pg._save = function() {
    ctx.save();
    // set default colors
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
  };

  pg._restore = function() {
    ctx.restore();
  };
  return pg;
};

function PCompiler (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '-', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    var TYPES = ['void', 'float', 'int', 'PGraphics'];
    var TOKENS_SPACE = [ ' ' , '\n', '\r', '\t'];


    while (src.indexOf('[]') !== -1) {
      var i = src.indexOf('[]');
      var token = getNextWordToken(src, i + 2);
      console.log(token);
      if (token === '=') {
        src = replaceAt(src, src.indexOf('{', i + 2), '[');
        src = replaceAt(src, src.indexOf('}', i + 2), ']');
      }
      src = src.replace('[]', '');
    }


    function replaceAt(txt, index, character) {
      return txt.substr(0, index) + character + txt.substr(index+character.length); 
    }
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
        if (word === 'frameCount') {
          word = 'frameCount()';
        }

        if (word === 'cos') {
          word = 'Math.cos';
        }
        if (word === 'sin') {
          word = 'Math.sin';
        }

        if (TYPES.indexOf(word) !== -1) {
          var next = getNextWordToken(src, i + 1);
        //  console.log(word, next);

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
  


  function map(value, start1, stop1, start2, stop2) {
    var d1 = stop1 - start1;
    var d2 = stop2 - start2;

    var d = value - start1;

    return  d * (d2 / d1);
  }

  function radians(angle) {
    return angle * Math.PI / 180;
  }

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
      FRAMECOUT++;
      mainPG._save();
      loopFn();
      mainPG._restore();
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

  var FRAMECOUT = 0;
  function frameCount() {
    return FRAMECOUT;
  }

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

  // constants
  source = 'var PI = Math.PI; var TWO_PI = Math.PI * 2;var CLOSE = 1;' + source;


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
    'triangle',
    'arc',
    'quad',
    
    'pushMatrix',
    'popMatrix',

    'beginShape',
    'endShape',
    'vertex',


    'rotate',

    'map',
    'radians',

    '___SetLoop',
    '___SetMousePressed',
    'noLoop',
    'loop',
    'redraw',
    'mouseX',
    'mouseY',
    'frameCount',
    

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
    mainPG.triangle,
    mainPG.arc,
    mainPG.quad,


    mainPG._save,
    mainPG._restore,

    mainPG.beginShape,
    mainPG.endShape,
    mainPG.vertex,

    mainPG.rotate,

    map,
    radians,

    ___SetLoop,
    ___SetMousePressed,
    noLoop,
    loop,
    redraw,
    mouseX,
    mouseY,
    frameCount
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

