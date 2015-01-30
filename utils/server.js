"use strict";

var express = require('express');
var serveStatic = require('serve-static');
var lr = require('connect-livereload');

var app = express();
app.use(lr());
app.use(serveStatic(process.env.DIST));

app.listen(3000, function(err, callback) {
  if (err) throw err;
  console.log('Simple HTTP server listening on port 3000');
});
