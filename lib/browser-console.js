var global = (
  typeof window === 'object' ? window :
  typeof self === 'object' ? self : {}
)

module.exports = {
  object: 'console' in global && global.console,
  set: object => global.console = object
}
