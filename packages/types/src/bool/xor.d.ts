/**
 * checks if one of `A` and `B` is true and the other false
 */
export type Xor<A extends boolean, B extends boolean> =
  /* as of TS4.9, conditional types are only deferred for single-element tuples, not multi-element ones.
   * this should be fixed in https://github.com/microsoft/TypeScript/pull/52091/, slated for the TS5.0 milestone.
   * also relevant: https://github.com/microsoft/TypeScript/issues/51145#issuecomment-1276804047
   */
  // [A, B] extends [true, false] ? true
  // : [A, B] extends [false, true] ? true
  // : false
  [A] extends [true]
    ? [B] extends [false]
      ? true
      : false
  : [A] extends [false]
    ? [B] extends [true]
      ? true
      : false
  : false