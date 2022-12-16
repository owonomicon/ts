/**
 * checks whether number `N` is negative
 * 
 * @warning cannot distinguish `-0` from `0`, which is considered nonnegative 
 */
export type IsNegative<N extends number> =
  `${N}` extends `-${string}`
    ? true
    : false