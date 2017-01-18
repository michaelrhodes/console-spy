var emitter = require('mittens')
var methods = require('./lib/methods')
var console = require('./lib/console')
var slice = Array.prototype.slice
var spying = false

function ConsoleSpy () {
  if (!(this instanceof ConsoleSpy)) {
    return new ConsoleSpy
  }

  this.console = {}

  ;(function proxy (spy, remaining) {
    var method = methods[--remaining]

    spy.console[method] = function () {
      if (console.obj && typeof console.obj[method] === 'function') {
        console.obj[method].apply(console.obj, arguments)
      }
      spy.emit.apply(spy, [method].concat(slice.call(arguments)))
    }

    if (remaining) proxy(spy, remaining)
  })(this, methods.length)

  this.enable()
}

emitter.call(ConsoleSpy.prototype)

ConsoleSpy.prototype.enable = function () {
  if (!spying) {
    console.set(this.console)
    spying = true
  }
}

ConsoleSpy.prototype.disable = function () {
  if (spying) {
    console.set(console.obj)
    spying = false
  }
}

module.exports = ConsoleSpy
