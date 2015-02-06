"use strict";

var path = require('path');
var supervisor = require('supervisor');
var livereload = require('tiny-lr')();

function HttpTask (params) {
  this.params = (params || {});
}

HttpTask.displayName = 'HttpTask';

HttpTask.getDefaults = function() {
  return {
    lrPort: 35729,
    listen: 3000,
    env: 'development',
    dist: '::dist'
  };
};

HttpTask.prototype.generateWatcher = function(gulp, params) {
  return function() {
    var simpleServer = path.join(__dirname, './utils/server.js');
    var server = params.file || simpleServer;

    livereload.listen(params.lrPort);

    gulp.watch([params.dist + '/**/*'], function(event) {
      var fileName = path.relative(__dirname, event.path);
      livereload.changed({body: { files: [fileName] }});
    });

    supervisor.run(['--harmony', '-i build/', '-e js', server]);
  };
};

module.exports = HttpTask;
