import test from 'ava'
import sleep from 'es7-sleep'
import ParallelArray from '.'

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
    return Date.now() - now > 3000
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
