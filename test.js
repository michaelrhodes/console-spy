var test = require('tape')
var spy = require('./')

test('it can be enabled', function (assert) {
  assert.plan(1)

  var instance = spy(function () {
    this.log = function () {
      clearTimeout(fail)
      instance.disable()
      assert.pass('spied foo')
    }
    this.withholding = true
  })

  var fail = timeout(function () {
    instance.disable()
    assert.fail('log handler wasn’t called')
  })

  console.log('foo')
})

test('it can be disabled', function (assert) {
  var instance = spy(function () {
    this.log = function (val) {
      instance.disable()
      assert.equal(val, 'foo', 'spied foo')
    }
    this.withholding = true
  })

  console.log('foo')
  console.log('bar')
  assert.end()
})

function timeout (cb) {
  return setTimeout(cb, 0)
}
