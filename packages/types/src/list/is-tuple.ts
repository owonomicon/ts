import { List } from "./list"

/**
 * whether `L` is a tuple type (including readonly)
 */
export type IsTuple<L extends List> =
  any[] extends L
    ? false
    : true

export type IsTupleList<T> =
  T extends List
    ? IsTuple<T>
    : false