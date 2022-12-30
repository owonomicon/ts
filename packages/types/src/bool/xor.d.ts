/**
 * checks if one of `A` and `B` is true and the other false
 */
export type Xor<A extends boolean, B extends boolean> =
  [A, B] extends [true, false] ? true
  : [A, B] extends [false, true] ? true
  : false