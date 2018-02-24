"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class AsyncArray extends Array {
  _generatePromises(asyncFunc, group, index) {
    group = group || this.length;
    let promises = [];
    for (let i = group * index; i < Math.min(group * (index + 1), this.length); i++) {
      promises.push(asyncFunc(this[i], i, this));
    }
    return promises;
  }

  asyncForEach(asyncFunc, group) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.asyncMap(asyncFunc, group);
    })();
  }

  asyncMap(asyncFunc, group) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      group = group || _this2.length;
      let loop = _this2.length % group ? _this2.length / group + 1 : _this2.length / group;
      loop = parseInt(loop);
      let result = [];

      for (let i = 0; i < loop; i++) {
        let promises = _this2._generatePromises(asyncFunc, group, i);
        let temp = yield Promise.all(promises);
        result.push(...temp);
      }
      return result;
    })();
  }

  asyncFilter(asyncFunc, group) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let temp = yield _this3.asyncMap(asyncFunc, group);
      let result = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]) {
          result.push(_this3[i]);
        }
      }
      return result;
    })();
  }

  asyncEvery(asyncFunc, group) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let temp = yield _this4.asyncMap(asyncFunc, group);
      return temp.every(function (value) {
        return value;
      });
    })();
  }

  asyncSome(asyncFunc, group) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      let temp = yield _this5.asyncMap(asyncFunc, group);
      return temp.some(function (value) {
        return value;
      });
    })();
  }

  asyncSort(asyncFunc) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (_this6.length < 2) {
        return;
      }

      let midIndex = parseInt(_this6.length / 2);
      let midValue = _this6[midIndex];

      let left = [];
      let right = [];
      for (let i = 0; i < _this6.length; i++) {
        let compareResult = yield asyncFunc(_this6[i], midValue);
        if (compareResult < 0) {
          left.push(_this6[i]);
        } else if (compareResult > 0) {
          right.push(_this6[i]);
        }
      }

      left = AsyncArray.of(...left);
      yield left.asyncSort(asyncFunc);
      right = AsyncArray.of(...right);
      yield right.asyncSort(asyncFunc);

      for (let i = 0; i < _this6.length; i++) {
        if (i < left.length) {
          _this6[i] = left[i];
        } else if (i === left.length) {
          _this6[i] = midValue;
        } else if (i > left.length) {
          _this6[i] = right[i - left.length - 1];
        }
      }
    })();
  }
}
exports.default = AsyncArray;