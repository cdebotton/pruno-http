"use strict";

var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');

var app = express();
app.use(compression());
app.use(serveStatic(process.env.DIST));

app.listen(process.env.PORT, function(err, callback) {
  if (err) throw err;
  console.log('PrunoHTTP server listening on port ' + process.env.PORT + '.');
});
