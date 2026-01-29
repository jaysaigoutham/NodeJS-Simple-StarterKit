/**
 * Reverse Function Unit Tests
 * Tests the string reversal functionality
 */

const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('./testing_methods').reverse

// Test reversing a single character
test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

// Test reversing a word
test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})
