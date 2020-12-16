import importUnique from './import-unique';


describe('import-unique', () => {
  it('should import a unique copy of the module', () => {
    const instanceA = require('../mocks/singleton-module');
    const instanceB = require('../mocks/singleton-module');

    // Create two variables to hold the results of incrementing the counter.
    let counterA;
    let counterB;

    // Increment the counter via separate references.
    counterA = instanceA();
    counterB = instanceB();

    // Assert that the counters are tracking the same variable.
    expect(counterA).toBe(1);
    expect(counterB).toBe(2);

    jest.resetModules();

    // Now, import a unique copy of the same module.
    const instanceC = importUnique('../mocks/singleton-module');

    // Increment the counter.
    const counterC = instanceC();

    // Assert that this copy of the counter is unique.
    expect(counterC).toBe(1);

    // Increment the original counter again.
    counterA = instanceA();
    counterB = instanceB();

    // Assert that it hasn't changed.
    expect(counterA).toBe(3);
    expect(counterB).toBe(4);
  });

  describe('when provided a non-string argument', () => {
    it('should throw an error', () => {
      expect(() => {
        // @ts-ignore
        importUnique({});
      }).toThrow('Expected first argument to be of type "string"');
    });
  });
});
