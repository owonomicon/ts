import { Length, List } from "."

/**
 * whether `L` is a variadic list
 */
export type IsVariadic<L extends List> =
  number extends Length<L>
    ? true
    : false

export type IsVariadicList<T> =
  T extends List
    ? IsVariadic<T>
    : false