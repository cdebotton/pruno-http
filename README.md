# pruno-http

A simple HTTP server for pruno. Especially useful for prototyping or building static sites.

## Usage

```js
"use strict";

var pruno = require('pruno');

pruno.plugins(function(mix) {
  mix
    .configure({ dir: __dirname + '/config' })
    .http({
      listen: 3000,
      env: 'development',
      dist: './dist',
      file: './server.js' // If you want to use your own simple http server.
    });
});
```
