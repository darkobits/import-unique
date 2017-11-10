import {dirname} from 'path';
import resolveFrom from 'resolve-from';
import callerPath from 'caller-path';


/**
 * Loads a unique copy of the named module, bypassing the cache.
 *
 * @param  {string} name - Module name to load.
 * @return {*}
 */
export default function importFreshWhilstPreservingCache(name) {
  // Compute the path Node would have used to resolve the module had it been
  // imported from the caller's file.
  const key = resolveFrom(dirname(callerPath()), name);

  // Save a copy of the cached module, because we just might need it later.
  const cached = require.cache[key];

  // Temporarily remove the cached module.
  Reflect.deleteProperty(require.cache, key);

  // Load a fresh copy of the named module.
  const unique = require(key);

  // Replace the cached copy of the module, because that's the right neighborly
  // thing to do, dontcha know. ಠ_ಠ
  require.cache[key] = cached;

  // Return the unique copy of the module.
  return unique;
}
