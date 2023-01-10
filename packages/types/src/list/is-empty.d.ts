import { Length } from "./length"
import { List } from "./list"

export type IsEmpty<L extends List> =
  Length<L> extends 0
    ? true
    : false

export type IsEmptyList<T> =
  T extends List
    ? IsEmpty<T>
    : false