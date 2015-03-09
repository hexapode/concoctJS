function PCompiler (src) {
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
      if (TOKENS.indexOf(src[i]) !== -1) {


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
    console.log(source);
    return source;
  }