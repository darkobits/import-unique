import {expect} from 'chai';
import importUnique from './import-unique';

describe('import-unique', () => {
  it('should import a unique copy of the module', () => {
    const instanceA = require('../mocks/singleton-module').default; // tslint:disable-line no-require-imports
    const instanceB = require('../mocks/singleton-module').default; // tslint:disable-line no-require-imports

    // Create two variables to hold the results of incrementing the counter.
    let counterA;
    let counterB;

    // Increment the counter via separate references.
    counterA = instanceA();
    counterB = instanceB();

    // Assert that the counters are tracking the same variable.
    expect(counterA).to.equal(1);
    expect(counterB).to.equal(2);

    // Now, import a unique copy of the same module.
    const instanceC = importUnique('../mocks/singleton-module').default;

    // Increment the counter.
    const counterC = instanceC();

    // Assert that this copy of the counter is unique.
    expect(counterC).to.equal(1);

    // Increment the original counter again.
    counterA = instanceA();
    counterB = instanceB();

    // Assert that it hasn't changed.
    expect(counterA).to.equal(3);
    expect(counterB).to.equal(4);

    // Import another reference to the shared module *after* we have used
    // importUnique.
    const instanceD = require('../mocks/singleton-module').default; // tslint:disable-line no-require-imports

    const counterD = instanceD();

    // Assert that we have, in fact, received a copy of the shared module.
    expect(counterD).to.equal(5);
  });

  describe('when provided a non-string argument', () => {
    it('should throw an error', () => {
      expect(() => {
        // @ts-ignore
        importUnique({});
      }).to.throw('Expected first argument to be of type "string"');
    });
  });
});
