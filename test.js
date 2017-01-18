var test = require('tape')
var enable = require('./')

var teardown = function (spy) {
  spy.disable()
  spy.off('log')
}

test('it is enabled on require', function (assert) {
  assert.plan(1)

  var spy = enable()

  var fail = setTimeout(function () {
    spy.disable()
    assert.fail('"log" event didn’t fire')
  }, 0)

  spy.on('log', function () {
    clearTimeout(fail)
    spy.disable()
    assert.pass('spied "foo"')
  })
  
  console.log('foo')

  setTimeout(function () {
    teardown(spy)
  }, 0)
})

test('it can be disabled', function (assert) {
  assert.plan(1)

  var spy = enable()

  spy.on('log', function (msg) {
    spy.disable()
    assert.equal(msg, 'foo', 'spied "foo"')
  })

  console.log('foo')

  setTimeout(function () {
    console.log('bar')
    teardown(spy)
  }, 0)
})
