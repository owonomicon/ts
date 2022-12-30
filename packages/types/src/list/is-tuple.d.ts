import { And } from "../bool/and"
import { Not } from "../bool/not"
import { Extends } from "../type/extends"
import { IsList } from "./is-list"

/**
 * whether `T` is a tuple type (including readonly)
 */
export type IsTuple<T> =
  And<
    IsList<T>,
    Not<Extends<any[], T>>
  >