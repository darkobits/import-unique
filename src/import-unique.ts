import path from 'path';
import resolveFrom from 'resolve-from';
// @ts-ignore
import callerPath from 'caller-path';


/**
 * Loads a unique copy of the named module, bypassing the cache.
 */
export default function importUnique(name: string): any {
  if (typeof name !== 'string') { // tslint:disable-line strict-type-predicates
    throw new TypeError(`[import-unique] Expected first argument to be of type "string", got "${typeof name}".`);
  }

  // Compute the path Node would have used to resolve the module had it been
  // imported from the caller's file.
  const key = resolveFrom(path.dirname(callerPath()), name);

  // Save a copy of the cached module, because we just might need it later.
  const cached = require.cache[key];

  // Temporarily remove the cached module.
  Reflect.deleteProperty(require.cache, key);

  // Load an un-cached copy of the named module.
  const unique = require(key);

  // Replace the cached copy of the module.
  require.cache[key] = cached;

  // Return the unique copy of the module.
  return unique;
}
