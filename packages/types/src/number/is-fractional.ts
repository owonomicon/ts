import { Abs } from "."

/**
 * checks whether number `N` is fractional (i.e. has a decimal point)
 * 
 * @since 0.0.2
 */
export type IsFractional<N extends number> =
  `${Abs<N>}` extends `${number}.${number}`
    ? true
    : false

/**
 * @since 0.0.2
 */
export type IsFractionalNumber<T> =
  T extends number
    ? IsFractional<T>
    : false