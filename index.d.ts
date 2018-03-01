declare module "parallel-array" {
  interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
  }
  class ParallelArray<T> extends Array {
    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    static from(arrayLike: ArrayLike<any>, mapfn?: (value: any, index: number) => any, thisArg?: any): ParallelArray<any>

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
     static asyncFrom(arrayLike: ArrayLike<any>, mapfn?: (value: any, index: number) => Promise<any>, thisArg?: any): Promise<ParallelArray<any>>

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    static of(...items: any[]): ParallelArray<any>
  
    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A async function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param group If group is specified, it is used as the group number to group the array.
      * If group is omitted, the length of the array is used  as the group value.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    asyncForEach(callbackfn: (value: T, index: number, array: ParallelArray<T>) => Promise<void>, group?: number, thisArg?: any): Promise<void>

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
    asyncMap(callbackfn: (value: T, index: number, array: ParallelArray<T>) => Promise<any>, group?: number, thisArg?: any): Promise<ParallelArray<any>>

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A async function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param group If group is specified, it is used as the group number to group the array.
      * If group is omitted, the length of the array is used  as the group value.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    asyncFilter(callbackfn: (value: T, index: number, array: ParallelArray<T>) => Promise<boolean>, group?: number, thisArg?: any): Promise<ParallelArray<T>>

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
    asyncEvery(callbackfn: (value: T, index: number, array: ParallelArray<T>) => Promise<boolean>, group?: number, thisArg?: any): Promise<boolean>
    
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
    asyncSome(callbackfn: (value: T, index: number, array: ParallelArray<T>) => Promise<boolean>, group?: number, thisArg?: any): Promise<boolean>

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements.
      */
    asyncSort(compareFn: (a: T, b: T) => Promise<number>): Promise<this>

    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A async function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    asyncReduce(callbackfn: (previousValue: any, currentValue: T, currentIndex: number, array: ParallelArray<T>) => Promise<any>, initialValue?: any): Promise<any>

    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    asyncReduceRight(callbackfn: (previousValue: any, currentValue: T, currentIndex: number, array: ParallelArray<T>) => Promise<any>, initialValue?: any): Promise<any>

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    asyncFind(predicate: (value: T, index: number, array: ParallelArray<T>) => Promise<boolean>, thisArg?: any): Promise<T | undefined>

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    asyncFindIndex(predicate: (value: T, index: number, array: ParallelArray<T>) => Promise<boolean>, thisArg?: any): Promise<number>

    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: any[]): ParallelArray<any>

    /**
      * Reverses the elements in an Array.
      */
    reverse(): ParallelArray<any>

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): ParallelArray<T>

    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      * @param items Elements to insert into the array in place of the deleted elements.
      */
    splice(start: number, deleteCount: number, ...items: T[]): ParallelArray<T>
  }
  export=ParallelArray
}
