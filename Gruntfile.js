/**
 * Grunt!
 */
var fs = require('fs');
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  var PG_FILES = fs.readdirSync('./src/PGraphics');

  var FILES = ['./src/pgraphics_head.js'];
  for (var i = 0; i < PG_FILES.length; ++i) {
    if (PG_FILES[i][0] !== '.') {
      FILES.push('./src/PGraphics/' + PG_FILES[i])
    }
  }
  FILES.push('./src/pgraphics_footer.js');

  
  FILES.push('./src/pcompiler.js');
  FILES.push('./src/concoct.js');
  FILES.push('./src/main.js');
  console.log(FILES);

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: FILES,
        dest: 'build/concoct.js',
      },
    },
  });

  grunt.registerTask('default', ['concat']);
}