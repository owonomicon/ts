/**
 * checks if either `A` or `B` extend `true`
 */
export type Or<A extends boolean, B extends boolean> =
  /* there appears to be some strange behavior where this construct returns the wrong value
   *  when used in a generic type, and either `A` or `B` use that generic type's type parameter in turn.
   * @see https://github.com/microsoft/TypeScript/issues/52068 
   */
  // [A, B] extends [false, false]
  //   ? false
  //   : true
  [A] extends [true] ? true
  : [B] extends [true] ? true
  : false
