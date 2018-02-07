### AsyncArray
AsyncArray is the subclass of Array, implements some async function, for example: asyncForEach、asyncMap、asyncFilter etc

```javascript
let arr = new AsyncArray(1, 2, 3)
arr.asyncForEach(async(value, index, arr) => {
  ...
}, 3)

arr.asyncMap(async(value, index, arr) => {
  ...
}, 3)

arr.asyncFilter(async(value, index, arr) => {
  ...
}, 3)
```