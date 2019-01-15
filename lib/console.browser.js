var _global  = typeof window !== 'undefined' ? window :
  typeof global !== 'undefined' ? global :
  typeof self !== 'undefined' ? self : {}

module.exports = {
  obj: ('console' in _global &&
    typeof _global.console === 'object' &&
    typeof _global.console.log === 'function' ?
      _global.console : null
  ),
  set: function (obj) {
    _global.console = obj
  }
}
