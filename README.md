<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/41857985-986c12c0-784d-11e8-9e05-cb64ca41c70f.png" style="max-width: 100%">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/import-unique"><img src="https://img.shields.io/npm/v/@darkobits/import-unique.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/darkobits/import-unique"><img src="https://img.shields.io/travis/darkobits/import-unique.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/import-unique"><img src="https://img.shields.io/david/darkobits/import-unique.svg?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/import-unique"><img src="https://img.shields.io/codacy/coverage/99618c780f75477d916ff4cd2265bb85.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-e271a5.svg?style=flat-square"></a>
</p>

_(Yet another)_ "import and bypass Node's `require.cache`" package. This one, however, restores the cache to its prior state after fetching a unique copy of the provided module, making it unobtrusive.

## Install

```bash
$ npm i @darkobits/import-unique
```

## Use

This package's default export is a function with the following signature:

```ts
type importUnique = (module: string): any;
```

The function will temporarily remove the resolved module from Node's cache, `require()` it, restore the cached version, and return the unique version.

> `i-can-haz.js`

```js
let canHaz = false;

// Something that operates on shared mutable state.
export default function toggleCanHaz() {
  canHaz = !canHaz;
  return canHaz;
}
```

> `a.js`

```js
import canHaz from './i-can-haz';

console.log(canHaz()); // => true
```

> `b.js`

```js
import canHaz from './can-haz';

console.log(canHaz()); // => false
```

Because `i-can-haz` relies on shared mutable state, `b.js` is now a sad panda, as it clearly cannot haz, and may or may not know/care that it cannot haz because `a.js` already haz. We generally want to avoid writing our modules this way, so as to ensure that everyone can haz. Sometimes, however, we may have to work with a module we don't control. Bypassing Node's module cache is a reasonable way to ensure everyone who wants to haz... can haz.

> `a.js`

```js
import importUnique from '@darkobits/import-unique';

const canHaz = importUnique('./i-can-haz');

console.log(canHaz()); // => true
```

> `b.js`

```js
import importUnique from '@darkobits/import-unique';

const canHaz = importUnique('./i-can-haz');

console.log(canHaz()); // => true
```

**N.B.** If there are other modules importing `i-can-haz` normally and, in fact, expect the shared mutable state behavior it uses, they may continue to do so. Modules that import the shared copy of `i-can-haz` _after_ a unique copy has been imported will continue to get the same shared copy of the module. In this way, `import-unique` is completely unobtrusive and everyone can haz what they want.

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>
