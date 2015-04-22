"use strict";

var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');

var app = express();
app.use(compression());
app.use(serveStatic(process.env.DIST));

app.listen(3000, function(err, callback) {
  if (err) throw err;
  console.log('Simple HTTP server listening on port 3000');
});
