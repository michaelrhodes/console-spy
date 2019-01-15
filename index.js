var emitter = require('mittens')
var methods = require('./lib/methods')
var console = require('./lib/console')
var slice = Array.prototype.slice
var spying = false

module.exports = ConsoleSpy

function ConsoleSpy () {
  if (!(this instanceof ConsoleSpy)) return new ConsoleSpy
  this.console = {}
  this.preventDefault = false
  bind(this, methods)
}

emitter.call(ConsoleSpy.prototype)
ConsoleSpy.prototype.enable = enable
ConsoleSpy.prototype.disable = disable

function enable (preventDefault) {
  if (spying) return
  this.preventDefault = !!preventDefault
  console.set(this.console)
  spying = true
}

function disable () {
  if (!spying) return
  this.preventDefault = false
  console.set(console.obj)
  spying = false
}

function bind (spy, methods) {
  (function copy (remaining) {
    var method = methods[--remaining]

    spy.console[method] = function () {
      var fn = console.obj &&
        typeof console.obj[method] === 'function' &&
        console.obj[method]

      var passthrough = !spy.preventDefault && !!fn
      if (passthrough) fn.apply(console.obj, arguments)
      spy.emit.apply(spy, [method].concat(slice.call(arguments)))
    }

    if (remaining) copy(remaining)
  })(methods.length)
}
