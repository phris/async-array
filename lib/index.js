"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * ParallelArray is the subclass of Array, implements some async function
 * for example: asyncForEach、asyncMap、asyncFilter etc
 * @class
 * @extends Array
 * @public
 */
class ParallelArray extends Array {
  static _fromArray(arr) {
    const parr = new ParallelArray();
    parr.push(...arr);
    return parr;
  }

  _generatePromises(callbackfn, group, index, thisArg) {
    group = group || this.length;
    const promises = [];
    for (let i = group * index; i < Math.min(group * (index + 1), this.length); i++) {
      promises.push(callbackfn.call(thisArg, this[i], i, this));
    }
    return promises;
  }

  /**
    * Creates an array from an array-like or iterable object.
    * @param arrayLike An array-like or iterable object to convert to an array.
    * @param mapfn A mapping function to call on every element of the array.
    * @param thisArg Value of 'this' used to invoke the mapfn.
    */
  static from(arrayLike, mapfn, thisArg) {
    const arr = super.from(arrayLike, mapfn, thisArg);
    return ParallelArray._fromArray(arr);
  }

  /**
    * Creates an array from an array-like or iterable object.
    * @param arrayLike An array-like or iterable object to convert to an array.
    * @param mapfn A mapping function to call on every element of the array.
    * @param thisArg Value of 'this' used to invoke the mapfn.
    */
  static asyncFrom(arrayLike, mapfn, thisArg) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const arr = _this.from(arrayLike);
      return arr.asyncMap(mapfn, arr.length, thisArg);
    })();
  }

  /**
    * Returns a new array from a set of elements.
    * @param items A set of elements to include in the new array object.
    */
  static of(...items) {
    const arr = super.of(...items);
    return ParallelArray._fromArray(arr);
  }

  /**
    * Performs the specified action for each element in an array.
    * @param callbackfn  A async function that accepts up to three arguments. forEach calls the
    * callbackfn function one time for each element in the array.
    * @param group If group is specified, it is used as the group number to group the array.
    * If group is omitted, the length of the array is used  as the group value.
    * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
    * If thisArg is omitted, undefined is used as the this value.
    */
  asyncForEach(callbackfn, group, thisArg) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.asyncMap(callbackfn, group, thisArg);
    })();
  }

  /**
    * Calls a defined callback function on each element of an array, and returns an array that
    * contains the results.
    * @param callbackfn A async function that accepts up to three arguments. The map method calls the
    * callbackfn function one time for each element in the array.
    * @param group If group is specified, it is used as the group number to group the array.
    * If group is omitted, the length of the array is used  as the group value.
    * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    * If thisArg is omitted, undefined is used as the this value.
    */
  asyncMap(callbackfn, group, thisArg) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      group = group || _this3.length;
      let loop = _this3.length % group ? _this3.length / group + 1 : _this3.length / group;
      loop = parseInt(loop);
      const result = [];

      for (let i = 0; i < loop; i++) {
        const promises = _this3._generatePromises(callbackfn, group, i, thisArg);
        const temp = yield Promise.all(promises);
        result.push(...temp);
      }
      return ParallelArray._fromArray(result);
    })();
  }

  /**
    * Returns the elements of an array that meet the condition specified in a callback function.
    * @param callbackfn A async function that accepts up to three arguments. The filter method calls
    * the callbackfn function one time for each element in the array.
    * @param group If group is specified, it is used as the group number to group the array.
    * If group is omitted, the length of the array is used  as the group value.
    * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    * If thisArg is omitted, undefined is used as the this value.
    */
  asyncFilter(callbackfn, group, thisArg) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const temp = yield _this4.asyncMap(callbackfn, group, thisArg);
      const result = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]) {
          result.push(_this4[i]);
        }
      }
      return ParallelArray._fromArray(result);
    })();
  }

  /**
    * Determines whether all the members of an array satisfy the specified test.
    * @param callbackfn A async function that accepts up to three arguments. The every method calls
    * the callbackfn function for each element in array1 until the callbackfn returns false,
    * or until the end of the array.
    * @param group If group is specified, it is used as the group number to group the array.
    * If group is omitted, the length of the array is used  as the group value.
    * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    * If thisArg is omitted, undefined is used as the this value.
    */
  asyncEvery(callbackfn, group, thisArg) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const temp = yield _this5.asyncMap(callbackfn, group, thisArg);
      return temp.every(function (value) {
        return value;
      });
    })();
  }

  /**
    * Determines whether the specified callback function returns true for any element of an array.
    * @param callbackfn A async function that accepts up to three arguments. The some method calls the
    * callbackfn function for each element in array1 until the callbackfn returns true, or until
    * the end of the array.
    * @param group If group is specified, it is used as the group number to group the array.
    * If group is omitted, the length of the array is used  as the group value.
    * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    * If thisArg is omitted, undefined is used as the this value.
    */
  asyncSome(callbackfn, group, thisArg) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const temp = yield _this6.asyncMap(callbackfn, group, thisArg);
      return temp.some(function (value) {
        return value;
      });
    })();
  }

  /**
    * Sorts an array.
    * @param compareFn The name of the function used to determine the order of the elements.
    */
  asyncSort(callbackfn) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (_this7.length < 2) {
        return;
      }

      let midIndex = parseInt(_this7.length / 2);
      let midValue = _this7[midIndex];

      let left = [];
      let right = [];
      for (let i = 0; i < _this7.length; i++) {
        let compareResult = yield callbackfn(_this7[i], midValue);
        if (compareResult < 0) {
          left.push(_this7[i]);
        } else if (compareResult > 0) {
          right.push(_this7[i]);
        }
      }

      left = ParallelArray.of(...left);
      yield left.asyncSort(callbackfn);
      right = ParallelArray.of(...right);
      yield right.asyncSort(callbackfn);

      for (let i = 0; i < _this7.length; i++) {
        if (i < left.length) {
          _this7[i] = left[i];
        } else if (i === left.length) {
          _this7[i] = midValue;
        } else if (i > left.length) {
          _this7[i] = right[i - left.length - 1];
        }
      }
    })();
  }

  /**
    * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    * @param callbackfn A async function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    */
  asyncReduce(callbackfn, initialValue) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      let result = initialValue;
      for (let i = 0; i < _this8.length; i++) {
        result = yield callbackfn(result, _this8[i], i, _this8);
      }
      return result;
    })();
  }

  /**
    * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
    * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    */
  asyncReduceRight(callbackfn, initialValue) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      _this9.reverse();
      return _this9.asyncReduce(callbackfn, initialValue);
    })();
  }

  /**
    * Returns the value of the first element in the array where predicate is true, and undefined
    * otherwise.
    * @param predicate find calls predicate once for each element of the array, in ascending
    * order, until it finds one where predicate returns true. If such an element is found, find
    * immediately returns that element value. Otherwise, find returns undefined.
    * @param thisArg If provided, it will be used as the this value for each invocation of
    * predicate. If it is not provided, undefined is used instead.
    */
  asyncFind(predicate, thisArg) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      for (let i = 0; i < _this10.length; i++) {
        const finded = yield predicate.call(thisArg, _this10[i], i, _this10);
        if (finded) {
          return _this10[i];
        }
      }
      return undefined;
    })();
  }

  /**
   * Returns the index of the first element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  asyncFindIndex(predicate, thisArg) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      for (let i = 0; i < _this11.length; i++) {
        const finded = yield predicate.call(thisArg, _this11[i], i, _this11);
        if (finded) {
          return i;
        }
      }
      return -1;
    })();
  }

  /**
    * Combines two or more arrays.
    * @param items Additional items to add to the end of array1.
    */
  concat(...items) {
    const arr = super.concat(...items);
    return ParallelArray._fromArray(arr);
  }

  /**
    * Reverses the elements in an Array.
    */
  reverse() {
    const arr = super.reverse();
    return ParallelArray._fromArray(arr);
  }

  /**
    * Returns a section of an array.
    * @param start The beginning of the specified portion of the array.
    * @param end The end of the specified portion of the array.
    */
  slice(start, end) {
    const arr = super.slice(start, end);
    return ParallelArray._fromArray(arr);
  }

  /**
    * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    * @param start The zero-based location in the array from which to start removing elements.
    * @param deleteCount The number of elements to remove.
    * @param items Elements to insert into the array in place of the deleted elements.
    */
  splice(start, deleteCount, ...items) {
    const arr = super.splice(start, deleteCount, ...items);
    return ParallelArray._fromArray(arr);
  }
}
exports.default = ParallelArray;