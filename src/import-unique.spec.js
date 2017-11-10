/* eslint-disable import/order, import/no-duplicates, import/first */

import assert from 'assert';
import importUnique from './import-unique';

// Create two references to the same copy of a module.
import instanceA from './mocks/mutable-module';
import instanceB from './mocks/mutable-module';

// Create two variables to hold the results of incrementing the counter.
let counterA;
let counterB;

// Increment the counter via separate references.
counterA = instanceA();
counterB = instanceB();

// Assert that the counters are tracking the same variable.
assert.equal(1, counterA, 'counterA should equal 1');
assert.equal(2, counterB, 'counterB should equal 2');

// Now, import a unique copy of the same module.
const instanceC = importUnique('./mocks/mutable-module').default;

// Increment the counter.
const counterC = instanceC();

// Assert that this copy of the counter is unique.
assert.equal(1, counterC, 'counterC should equal 1');

// Increment the original counter again.
counterA = instanceA();
counterB = instanceB();

// Assert that it hasn't changed.
assert.equal(3, counterA);
assert.equal(4, counterB);

// Import another reference to the shared module *after* we have used
// importUnique.
import instanceD from './mocks/mutable-module';

const counterD = instanceD();

// Assert that we have, in fact, received a copy of the shared module.
assert.equal(5, counterD, 'counterD should equal 5');
