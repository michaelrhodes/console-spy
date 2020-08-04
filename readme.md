# console-spy
listen in on calls to the global `console` object

[![ci](https://travis-ci.org/michaelrhodes/console-spy.svg?branch=master)](https://travis-ci.org/michaelrhodes/console-spy)

## install
```sh
npm install https://pkg.mkr.sx/console-spy/4.0.0.tgz
```

## use
```js
var cs = require('console-spy')

var spy = cs(function () {
  // Mixin custom handlers
  this.warn = warn
  this.log = log

  // Withhold arguments
  // from the real console
  this.withholding = true
})

console.log('First message')

// spy can be disabled
spy.disable()
console.log('Second message')

// and re-enabled
spy.enable()
console.log('Third message')

// and all the console methods
// can be spied upon
console.warn('Oh no!', 123)

function log () {
  => ["First message"]
  => ["Third message"]
}

function warn () {
  => ["On no!", 123]
}
```

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
