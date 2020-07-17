var test = require('tape')
var spy = require('./')

test('it can be enabled', function (assert) {
  assert.plan(1)

  var instance = spy()

  instance.enable()

  var fail = timeout(function () {
    instance.disable()
    assert.fail('"log" handler wasn’t called')
  })

  instance.log = function () {
    clearTimeout(fail)
    instance.disable()
    assert.pass('spied "foo"')
  }

  console.log('foo')

  timeout(function () {
    teardown(instance)
  })
})

test('it can be disabled', function (assert) {
  assert.plan(1)

  var instance = spy()

  instance.enable()

  instance.log = function (val) {
    instance.disable()
    assert.equal(val, 'foo', 'spied "foo"')
  }

  console.log('foo')

  timeout(function () {
    console.log('bar')
    teardown(instance)
  })
})

function teardown (instance) {
  instance.disable()
}

function timeout (cb) {
  return setTimeout(cb, 0)
}
