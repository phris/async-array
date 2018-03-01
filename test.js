import test from 'ava'
import sleep from 'es7-sleep'
import ParallelArray from '.'

test('from', async (t) => {
  const a = ParallelArray.from([1, 2, 3])
  t.true(a instanceof ParallelArray)
  t.true(a.join() === [1, 2, 3].join())
})

test('asyncFrom', async (t) => {
  const now = Date.now()
  const a = await ParallelArray.asyncFrom([1, 2, 3], async (value, index) => {
    await sleep(1000 * 1)
    return value * 1000 + Date.now() - now
  })
  t.true(a instanceof ParallelArray)
  t.true(a.length === 3)
  t.true(a.every(item => item > 1000))
})

test('of', async (t) => {
  const a = ParallelArray.of(1, 2, 3)
  t.true(a instanceof ParallelArray)
  t.true(a.join() === [1, 2, 3].join())
})

test('asyncForEach', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  await a.asyncForEach(async (value, index, arr) => {
    await sleep(1000 * 1)
  }, 3)
  t.true(Date.now() - now > 2000)
})

test('asyncMap', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  let b = await a.asyncMap(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now
  }, 1)
  t.true(b.length === a.length)
  b.map((item, index) => {
    t.true(item > parseInt(index / 2) * 1000)
  })
})

test('asyncFilter', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  let b = await a.asyncFilter(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now >= 3000
  }, 1)
  t.true(b.join() === [3, 4, 5].join())
})

test('asyncSome', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()

  let b = await a.asyncSome(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now > 2000
  })
  t.false(b)

  let c = await a.asyncSome(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now > 2000
  })
  t.true(c)
})

test('asyncEvery', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  let b = await a.asyncEvery(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now < 2000
  })
  t.true(b)

  let c = await a.asyncEvery(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now < 2000
  })
  t.false(c)
})

test('asyncSort', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const temp = a
  const now = Date.now()
  await a.asyncSort(async (a, b) => {
    await sleep(1000 * 1)
    if (a > b) {
      return 1
    } else if (a === b) {
      return 0
    } else {
      return -1
    }
  })
  t.true(a === temp)
  t.true(a.join() === [1, 2, 3, 4, 5].join())

  await a.asyncSort(async (a, b) => {
    await sleep(1000 * 1)
    if (a > b) {
      return -1
    } else if (a === b) {
      return 0
    } else {
      return 1
    }
  })
  t.true(a === temp)
  t.true(a.join() === [5, 4, 3, 2, 1].join())
})

test('asyncReduce', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  const sum = await a.asyncReduce(async (p, c) => {
    await sleep(1000)
    return p + c * (Date.now() - now)
  }, 1)
  t.true(Date.now() - now > 5000)
  t.true(sum > (1 * 1 + 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5) * 1000)
})

test('asyncReduceRight', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  const sum = await a.asyncReduce(async (p, c) => {
    await sleep(1000)
    return p + c * (Date.now() - now)
  }, 1)
  t.true(Date.now() - now > 5000)
  t.true(sum > (1 * 5 + 2 * 4 + 3 * 3 + 4 * 2 + 5 * 1) * 1000)
})

test('asyncFind', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  const target = await a.asyncFind(async (item) => {
    await sleep(1000)
    return item * (Date.now() - now) > 3000
  })
  t.true(target === 2)
})

test('asyncFindIndex', async (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const now = Date.now()
  const targetIndex = await a.asyncFindIndex(async (item) => {
    await sleep(1000)
    return item * (Date.now() - now) > 3000
  })
  t.true(targetIndex === 1)
})

test('concat', (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const b = a.concat([2, 3])
  t.true(b instanceof ParallelArray)
  t.true(b.length === 7)
})

test('reverse', (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const b = a.reverse()
  t.true(b instanceof ParallelArray)
  t.true(b.length === a.length)
  t.true(b.join() === a.join())
  t.true(a[0] === 5)
})

test('slice', (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const b = a.slice(0, 1)
  t.true(b instanceof ParallelArray)
  t.true(b.join() === [1].join())
})

test('splice', (t) => {
  const a = new ParallelArray(1, 2, 3, 4, 5)
  const b = a.splice(0, 1)
  t.true(b instanceof ParallelArray)
  t.true(b.join() === [1].join())
})
