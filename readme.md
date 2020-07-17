# console-spy
a little module for listening in on calls made to the global `console` object

[![build status](https://travis-ci.org/michaelrhodes/console-spy.svg?branch=master)](https://travis-ci.org/michaelrhodes/console-spy)

** No badge to prove it, but this module is designed to work in all browsers; even IE 6 and friends! **

## install
```sh
$ npm install console-spy
```

## usage
```js
var spy = require('console-spy')()

spy.log = function ($0) {
  // expected: ["First message"]
  // expected: ["Third message"]
}

spy.warn = function ($0, $1) {
  // expected: ["On no!", 123]
}

// note: passing a truthy value to enable
// will prevent calls from being passed
// through to the _real_ console
spy.enable()
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
```
