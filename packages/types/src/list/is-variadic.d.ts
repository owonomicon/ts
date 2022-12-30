import { Length } from "./length"
import { List } from "./list"

/**
 * whether `T` is a variadic list
 */
export type IsVariadic<T extends List> =
  number extends Length<T>
    ? true
    : false