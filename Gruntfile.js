/**
 * Grunt!
 */
var fs = require('fs');
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  var FILES = fs.readdirSync('./src');

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          './src/pgraphics.js',
          './src/pcompiler.js',
          './src/concoct.js',
          './src/main.js'
        ],
        dest: 'build/concoct.js',
      },
    },
  });

  grunt.registerTask('default', ['concat']);
}