/**
 * whether types `A` and `B` are mutually assignable (i.e. `A` can be assigned to `B` and vice versa).
 * 
 * this is subtly different from types being "equal"/"identical".
 * 
 * for example, `[string, any]` is not `[any, string]` but both _are_ assignable to each other
 */
export type MutuallyAssignable<A, B> =
  /* as of TS4.9, conditional types are only deferred for single-element tuples, not multi-element ones.
   * this should be fixed in https://github.com/microsoft/TypeScript/pull/52091/, slated for the TS5.0 milestone.
   * also relevant: https://github.com/microsoft/TypeScript/issues/51145#issuecomment-1276804047
   */
  // [A, B] extends [B, A]
  //   ? true
  //   : false
  [A] extends [B]
    ? [B] extends [A]
      ? true
      : false
    : false