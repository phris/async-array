import schedule from 'node-schedule'
import sleep from 'es7-sleep'
import AsyncArray from '.'

const test = async () => {
  const a = new AsyncArray(1, 2, 3, 4, 5)
  const now = Date.now()
  console.log(a instanceof AsyncArray)
  await a.asyncForEach(async (value, index, arr) => {
    await sleep(1000 * 1)
    console.log(index, Date.now() - now)
  }, 3)

  let b = await a.asyncMap(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now
  }, 3)
  console.log(b.join())

  let c = await a.asyncFilter(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now > 6000
  }, 3)
  console.log(c.join())

  let d = await a.asyncSome(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now > 8000
  }, 3)
  console.log(d)

  let e = await a.asyncEvery(async (value, index, arr) => {
    await sleep(1000 * 1)
    return Date.now() - now < 9000
  }, 3)
  console.log(e)

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
  console.log(a.join())
}

test()

schedule.scheduleJob({minute: 5}, () => {
  console.log(new Date())
})
