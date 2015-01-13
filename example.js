// console overrides are enabled by default,
var spy = require('./')()

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
