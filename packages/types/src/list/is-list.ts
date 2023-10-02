import { List } from "."

/**
 * whether `T` is an array type (including readonly and tuples)
 * 
 * @since 0.0.2
 */
export type IsList<T> =
  T extends List
    ? true
    : false