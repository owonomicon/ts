/**
 * gets the boolean XOR of booleans `A` and `B`
 * 
 * @remarks
 * does not distribute over `A` or `B`.
 * 
 * @undefined_behavior `A` is `never` or `boolean`
 * @undefined_behavior `B` is `never` or `boolean`
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = Xor<true, true>    // false
 * type e1 = Xor<true, false>   // true
 * type e2 = Xor<false, true>   // true
 * type e3 = Xor<false, false>  // false
 * ```
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
