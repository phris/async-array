# ParallelArray
ParallelArray is the subclass of Array, implements some async function, for example: asyncForEach、asyncMap、asyncFilter etc. The funciton of Array which return an instance of Array will return an instance of ParallelArray in ParallelArray.

<div align="left">
  <a href="https://www.npmjs.com/package/parallel-array">
    <img src="https://img.shields.io/node/v/parallel-array.svg" alt="npm" />
  </a>
  <a href="https://www.npmjs.com/package/parallel-array">
    <img src="https://badge.fury.io/js/parallel-array.svg" alt="npm" />
  </a>
  <a href="https://www.npmjs.com/package/parallel-array">
    <img src="https://img.shields.io/npm/dm/parallel-array.svg" alt="npm" />
  </a>
  <a href="https://travis-ci.org/phris/parallel-array">
    <img src="https://travis-ci.org/phris/parallel-array.svg?branch=master" alt="Travis CI" />
  </a>
  <a href="https://coveralls.io/github/phris/parallel-array">
    <img class="notice-badge" src="https://coveralls.io/repos/github/phris/parallel-array/badge.svg?branch=master" alt="Badge">
  </a>
  <a href="https://gitter.im/phris/parallel-array?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/phris/parallel-array.svg" alt="Join the chat at https://gitter.im/cheeriojs/cheerio" />
  </a>
</div>

## Install
```sh
npm install parallel-array
```

## Quick Example
### Init
```javascript
const arr = new ParallelArray(1, 2, 3, 4, 5)
```

```javascript
const arr = ParallelArray.from([1, 2, 3, 4, 5])
```

```javascript
const arr = await ParallelArray.asyncFrom([1, 2, 3, 4], async (value) => {
  ...
})
```

```javascript
const arr = ParallelArray.of(1, 2, 3, 4, 5)
```

### Use
```javascript
import ParallelArray from 'parallel-array'

const arr = new ParallelArray(1, 2, 3, 4, 5)

await arr.asyncForEach(async(value, index, arr) => {
  ...
}, 3)

await arr.asyncMap(async(value, index, arr) => {
  ...
}, 2)

await arr.asyncFilter(async(value, index, arr) => {
  ...
}, 3)

await arr.asyncSome(async(value, index, arr) => {
  ...
}, 5)

await arr.asyncEvery(async(value, index, arr) => {
  ...
}, 1)

await arr.asyncSort(async(a, b) => {
  ...
})

await arr.asyncReduce(async(p, c) => {
  ...
})

await arr.asyncReduceRight(async(p, c) => {
  ...
})

await arr.asyncFind(async(value, index, arr) => {
  ...
})

await arr.asyncFindIndex(async(value, index, arr) => {
  ...
})
```

The elements in the array will be gouped by group number, which the default value is the length of array. And the asynchronous function will run in parallel.