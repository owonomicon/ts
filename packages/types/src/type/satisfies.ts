/**
 * ensures `A` matches (i.e. extends) `B`.
 * resolves to `A` if `A` already matches `B`.
 * fallback can be overridden from `B` to a different type `C` if desired
 * 
 * @since 0.0.2
 */
export type Satisfies<A, B, C = B> =
  A extends B
    ? A
    : C