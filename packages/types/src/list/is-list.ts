import { List } from "."

/**
 * whether `T` is an array type (including readonly and tuples)
 */
export type IsList<T> =
  T extends List
    ? true
    : false