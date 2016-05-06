var global = require('global/window')

module.exports = {
  obj: ('console' in global &&
    typeof global.console === 'object' &&
    typeof global.console.log === 'function' ?
      global.console : null
  ),
  set: function (obj) {
    global.console = obj
  }
}
