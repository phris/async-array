export default class AsyncArray extends Array {
  _generatePromises (asyncFunc, group, index) {
    group = group || this.length
    let promises = []
    for (let i = group * index; i < Math.min(group * (index + 1), this.length); i++) {
      promises.push(asyncFunc(this[i], i, this))
    }
    return promises
  }

  async asyncForEach (asyncFunc, group) {
    await this.asyncMap(asyncFunc, group)
  }

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

  async asyncEvery (asyncFunc, group) {
    let temp = await this.asyncMap(asyncFunc, group)
    return temp.every(value => value)
  }

  async asyncSome (asyncFunc, group) {
    let temp = await this.asyncMap(asyncFunc, group)
    return temp.some(value => value)
  }

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

    left = AsyncArray.of(...left)
    await left.asyncSort(asyncFunc)
    right = AsyncArray.of(...right)
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
