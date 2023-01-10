/**
 * checks if both `A` and `B` extend true
 */
export type And<A extends boolean, B extends boolean> =
  /* as of TS4.9, conditional types are only deferred for single-element tuples, not multi-element ones.
   * this should be fixed in https://github.com/microsoft/TypeScript/pull/52091/, slated for the TS5.0 milestone.
   */
  // [A, B] extends [true, true]
  //   ? true
  //   : false
  [A] extends [true]
    ? [B] extends [true]
      ? true
      : false
    : false