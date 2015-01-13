# console-spy
console-spy is a little browser module for listening in on calls made to the `window.console` object. When enabled, it replaces all methods on the console object with event-emitting proxies.

*No badge to prove it, but this module is designed to work in all browsers; even old IE.*

## install
```sh
$ npm install console-spy
```

## usage
```js
// console overrides are enabled by default,
var spy = require('console-spy')()

var example = function () {
  console.log('First message')

  // but they can be disabled,
  spy.disable()
  console.log('Second message')

  // and re-enabled.
  spy.enable()
  console.log('Third message')

  // All console methods are
  // able to be spied upon.
  console.warn('Oh no!', 123)
}

spy.on('log', function () {
  // arguments: ["First message"]
  // arguments: ["Third message"]
})

spy.on('warn', function () {
  // arguments: ["On no!, 123"]
})

example()
```
