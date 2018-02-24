### ParallelArray
ParallelArray is the subclass of Array, implements some async function, for example: asyncForEach、asyncMap、asyncFilter etc

```javascript
let arr = new ParallelArray(1, 2, 3, 4, 5)
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

await arr.asyncSort(async(value, index, arr) => {
  ...
})
```

The elements in the array will be gouped by group number, which the default value is the length of array. And the asynchronous function will run in parallel.