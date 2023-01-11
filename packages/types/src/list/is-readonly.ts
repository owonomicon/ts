import { List } from "./list"

export type IsReadonly<L extends List> =
  L extends any[]
    ? false
    : true

export type IsReadonlyList<T> =
  T extends List
    ? IsReadonly<T>
    : false