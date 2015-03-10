

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
  }