var global = require('global/window')

module.exports = {
  obj: global.console,
  set: function (obj) {
    delete global.console
    global.console = obj
  }
}
