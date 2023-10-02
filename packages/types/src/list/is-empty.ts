import { Length, List } from "."

/**
 * @since 0.0.2
 */
export type IsEmpty<L extends List> =
  Length<L> extends 0
    ? true
    : false

/**
 * @since 0.0.2
 */
export type IsEmptyList<T> =
  T extends List
    ? IsEmpty<T>
    : false