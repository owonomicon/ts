import { Length, List } from "."

/**
 * whether `L` is a variadic list
 * 
 * @since 0.0.2
 */
export type IsVariadic<L extends List> =
  number extends Length<L>
    ? true
    : false

/**
 * @since 0.0.2
 */
export type IsVariadicList<T> =
  T extends List
    ? IsVariadic<T>
    : false