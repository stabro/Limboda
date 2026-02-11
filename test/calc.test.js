const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateInvoiceAmount, calculatePeriodConsumption } = require('../dist-calc');

test('first reading gives zero consumption', () => {
  assert.equal(calculatePeriodConsumption(123, null), 0);
});

test('invoice formula', () => {
  assert.equal(calculateInvoiceAmount(10, 5, 3), 35);
});
