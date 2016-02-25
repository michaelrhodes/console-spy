var emitter = require('emitter-component')
var methods = require('./methods')
var slice = Array.prototype.slice

var root = (typeof window !== 'undefined' ? window : global);
var spying = false
var console = (
  'console' in root &&
  'log' in root.console &&
  typeof root.console.log === 'function' ?
    root.console :
    null
)

function ConsoleSpy () {
  if (!(this instanceof ConsoleSpy)) {
    return new ConsoleSpy
  }

  this.console = {}

  ;(function proxy (spy, remaining) {
    var method = methods[--remaining]

    spy.console[method] = function () {
      spy.emit.apply(spy, [method].concat(slice.call(arguments)))
      if (console && typeof console[method] === 'function') {
        console[method].apply(console, arguments)
      }
    }

    if (remaining) {
      proxy(spy, remaining)
    }
  })(this, methods.length)

  this.enable()
}

emitter(ConsoleSpy.prototype)

ConsoleSpy.prototype.enable = function () {
  if (!spying) {
    root.console = this.console
    spying = true
  }
}

ConsoleSpy.prototype.disable = function () {
  if (spying) {
    root.console = console
    spying = false
  }
}

module.exports = ConsoleSpy
