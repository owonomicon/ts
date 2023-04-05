import { Abs } from "."

/**
 * checks whether number `N` is fractional (i.e. has a decimal point)
 */
export type IsFractional<N extends number> =
  `${Abs<N>}` extends `${number}.${number}`
    ? true
    : false

export type IsFractionalNumber<T> =
  T extends number
    ? IsFractional<T>
    : false