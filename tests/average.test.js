/**
 * Average Function Unit Tests
 * Tests the average calculation function with various inputs
 */

const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('./testing_methods').average


describe('average', () => {
  // Test single value returns itself
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  // Test multiple values calculated correctly
  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })

  // Test empty array returns zero
  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})