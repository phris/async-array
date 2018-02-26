/**
 * ParallelArray is the subclass of Array, implements some async function
 * for example: asyncForEach、asyncMap、asyncFilter etc
 * @class
 * @extends Array
 * @public
 */
export default class ParallelArray extends Array {
  /**
   * _generatePromises
   * @private
   * @param {Promise} asyncFunc 
   * @param {Number} group 
   * @param {Number} index 
   */
  _generatePromises (asyncFunc, group, index) {
    group = group || this.length
    let promises = []
    for (let i = group * index; i < Math.min(group * (index + 1), this.length); i++) {
      promises.push(asyncFunc(this[i], i, this))
    }
    return promises
  }

  /**
   * asyncForEach
   * @param {Promise} asyncFunc
   * @param {Number} [group]
   * @public
   */
  async asyncForEach (asyncFunc, group) {
    await this.asyncMap(asyncFunc, group)
  }

  /**
   * asyncMap
   * @param {Promise} asyncFunc
   * @param {Number} [group]
   * @returns {Array}
   * @public
   */
  async asyncMap (asyncFunc, group) {
    group = group || this.length
    let loop = this.length % group ? this.length / group + 1 : this.length / group
    loop = parseInt(loop)
    let result = []

    for (let i = 0; i < loop; i++) {
      let promises = this._generatePromises(asyncFunc, group, i)
      let temp = await Promise.all(promises)
      result.push(...temp)
    }
    return result
  }

  /**
   * asyncFilter
   * @param {Promise} asyncFunc
   * @param {Number} [group]
   * @returns {Array}
   * @public
   */
  async asyncFilter (asyncFunc, group) {
    let temp = await this.asyncMap(asyncFunc, group)
    let result = []
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]) {
        result.push(this[i])
      }
    }
    return result
  }

  /**
   * asyncEvery
   * @param {Promise} asyncFunc
   * @param {Number} [group]
   * @returns {Boolean}
   * @public
   */
  async asyncEvery (asyncFunc, group) {
    let temp = await this.asyncMap(asyncFunc, group)
    return temp.every(value => value)
  }

  /**
   * asyncSome
   * @param {Promise} asyncFunc
   * @param {Number} [group]
   * @returns {Boolean}
   * @public
   */
  async asyncSome (asyncFunc, group) {
    let temp = await this.asyncMap(asyncFunc, group)
    return temp.some(value => value)
  }

  /**
   * asyncSort
   * @param {Promise} asyncFunc
   * @public
   */
  async asyncSort (asyncFunc) {
    if (this.length < 2) {
      return
    }

    let midIndex = parseInt(this.length / 2)
    let midValue = this[midIndex]

    let left = []
    let right = []
    for (let i = 0; i < this.length; i++) {
      let compareResult = await asyncFunc(this[i], midValue)
      if (compareResult < 0) {
        left.push(this[i])
      } else if (compareResult > 0) {
        right.push(this[i])
      }
    }

    left = ParallelArray.of(...left)
    await left.asyncSort(asyncFunc)
    right = ParallelArray.of(...right)
    await right.asyncSort(asyncFunc)

    for (let i = 0; i < this.length; i++) {
      if (i < left.length) {
        this[i] = left[i]
      } else if (i === left.length) {
        this[i] = midValue
      } else if (i > left.length){
        this[i] = right[i - left.length - 1]
      }
    }
  }
}
