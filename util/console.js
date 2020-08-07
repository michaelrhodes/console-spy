module.exports = {
  object: global.console,
  set: function (object) {
    delete global.console
    return global.console = object
  }
}
