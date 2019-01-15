var test = require('tape')
var spy = require('./')

test('it can be enabled', function (assert) {
  assert.plan(1)

  var instance = spy()

  instance.enable()

  var fail = setTimeout(function () {
    instance.disable()
    assert.fail('"log" event didn’t fire')
  }, 0)

  instance.on('log', function () {
    clearTimeout(fail)
    instance.disable()
    assert.pass('spied "foo"')
  })
  
  console.log('foo')

  setTimeout(function () {
    teardown(instance)
  }, 0)
})

test('it can be disabled', function (assert) {
  assert.plan(1)

  var instance = spy()

  instance.enable()

  instance.on('log', function (msg) {
    instance.disable()
    assert.equal(msg, 'foo', 'spied "foo"')
  })

  console.log('foo')

  setTimeout(function () {
    console.log('bar')
    teardown(instance)
  }, 0)
})

function teardown (instance) {
  instance.disable()
  instance.off('log')
}
