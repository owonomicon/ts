/**
 * whether types `A` and `B` are mutually assignable (i.e. `A` can be assigned to `B` and vice versa).
 * 
 * this is subtly different from types being "equal"/"identical".
 * 
 * for example, `[string, any]` is not `[string, any]` but both _are_ assignable to each other
 */
export type MutuallyAssignable<A, B> =
  [A, B] extends [B, A]
    ? true
    : false