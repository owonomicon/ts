export type Xor<A extends boolean, B extends boolean> =
  [A, B] extends [true, false] ? true
  : [A, B] extends [false, true] ? true
  : false