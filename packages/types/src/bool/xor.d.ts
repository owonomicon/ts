export type Xor<A extends boolean, B extends boolean> =
  A extends true
    ? B extends true
      ? false
      : true
    : B extends true
      ? true
      : false