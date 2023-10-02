import { List } from "."

/**
 * @since 0.0.2
 */
export type IsReadonly<L extends List> =
  L extends any[]
    ? false
    : true

/**
 * @since 0.0.2
 */
export type IsReadonlyList<T> =
  T extends List
    ? IsReadonly<T>
    : false