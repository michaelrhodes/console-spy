module.exports = ConsoleSpy

var console = require('./lib/console')
var methods = require('./lib/methods')

function ConsoleSpy (spies) {
  if (!(this instanceof ConsoleSpy)) return new ConsoleSpy(spies)

  this.console = {}
  this.enable(spies)

  ;(function bind (spy, remaining, method) {
    method = methods[--remaining]
    spy.console[method] = function () {
      var sm = spy[method]
      var wh = spy.withholding
      var cm = console.object[method]
      cm && !wh && cm.apply(console.object, arguments)
      sm && sm.apply(spy, arguments)
    }
    remaining && bind(spy, remaining)
  })(this, methods.length)
}

ConsoleSpy.prototype.enable = enable
ConsoleSpy.prototype.disable = disable

function enable (spies) {
  spies && spies.call(this)
  this.enabled = !this.enabled && !!console.set(this.console)
}

function disable () {
  this.enabled = this.enabled && !console.set(console.object)
}
