/**
 * gets the boolean OR of booleans `A` and `B`
 * 
 * @remarks
 * does not distribute over `A` or `B`
 * 
 * @undefined_behavior `A` is `any`, `unknown`, `never`, or `boolean`
 * @undefined_behavior `B` is `any`, `unknown`, `never`, or `boolean`
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = Or<true, true>   // true
 * type e1 = Or<true, false>  // true
 * type e2 = Or<false, true>  // true
 * type e3 = Or<false, false> // false
 * ```
 */
export type Or<A extends boolean, B extends boolean> =
  /* there appears to be some strange behavior where this construct returns the wrong value
   *  when used in a generic type, and either `A` or `B` use that generic type's type parameter in turn.
   * @see https://github.com/microsoft/TypeScript/issues/52068 
   * 
   * note: as of ts5.3 seems there are still some questions regarding that syntax (?). see https://github.com/microsoft/TypeScript/issues/56270
   */
  // [A, B] extends [false, false]
  //   ? false
  //   : true
  [A] extends [true] ? true
  : [B] extends [true] ? true
  : false
