/**
 * checks whether number `N` is negative
 * 
 * @warning cannot distinguish `-0` from `0`, which is considered nonnegative 
 * 
 * @since 0.0.2
 */
export type IsNegative<N extends number> =
  `${N}` extends `-${string}`
    ? true
    : false

/**
 * @since 0.0.2
 */
export type IsNegativeNumber<T> =
  T extends number
    ? IsNegative<T>
    : false