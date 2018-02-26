declare module "parallel-array" {
  class ParallelArray<T> extends Array {
    asyncForEach(asyncFunc: Promise<void>, group?: Number):Promise<void>
    asyncMap(asyncFunc: Promise<any>, group?: Number): Promise<Array<any>>
    asyncFilter(asyncFunc: Promise<Boolean>, group?: Number): Promise<Array<T>>
    asyncEvery(asyncFunc: Promise<Boolean>, group?: Number): Promise<Boolean>
    asyncSome(asyncFunc: Promise<Boolean>, group?: Number): Promise<Boolean>
    asyncSort(asyncFunc: Promise<Number>): Promise<void>
  }
  export=ParallelArray
}
