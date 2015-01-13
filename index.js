var emitter = require('emitter-component')
var slice = Array.prototype.slice

var console = (
  'console' in window &&
  'log' in window.console &&
  typeof window.console.log === 'function' ?
    window.console :
    null
)

var methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeStamp', 'trace', 'warn'
]

var spying = false

function ConsoleSpy () {
  if (!(this instanceof ConsoleSpy)) {
    return new ConsoleSpy
  }

  this.console = {}

  ;(function process (spy, remaining) {
    var method = methods[--remaining]

    spy.console[method] = function () {
      spy.emit.apply(spy, [method].concat(slice.call(arguments)))
      if (console && typeof console[method] === 'function') {
        console[method].apply(console, arguments)
      }
    }

    if (remaining) {
      process(spy, remaining)
    }
  })(this, methods.length)

  this.enable()
}

emitter(ConsoleSpy.prototype)

ConsoleSpy.prototype.enable = function () {
  if (!spying) {
    window.console = this.console
    spying = true
  }
}

ConsoleSpy.prototype.disable = function () {
  if (spying) {
    window.console = console
    spying = false
  }
}

module.exports = ConsoleSpy
