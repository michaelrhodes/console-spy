var methods = require('./lib/methods')
var console = require('./lib/console')
var spying = false

module.exports = ConsoleSpy

function ConsoleSpy () {
  var spy = this

  if (!(spy instanceof ConsoleSpy))
    return new ConsoleSpy

  spy.console = {}
  spy.preventDefault = false

  ;(function copy (remaining) {
    var method = methods[--remaining]

    spy.console[method] = function () {
      var cb, fn = console.obj &&
        typeof console.obj[method] === 'function' &&
        console.obj[method]

      var passthrough = !spy.preventDefault && !!fn
      if (passthrough) fn.apply(console.obj, arguments)
      if (cb = spy[method]) cb.apply(spy, arguments)
    }

    if (remaining) copy(remaining)
  })(methods.length)
}

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
