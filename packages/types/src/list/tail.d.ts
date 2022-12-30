import { IsNever } from "../type/is-never"
import { If } from "../bool/if"
import { List } from "./list"
import { OmitFirst } from "./omit-first-n"

type _Tail<T extends List, R = OmitFirst<T>> =
  If<
    IsNever<R>,
    [],
    R
  >

/**
 * extracts the tail of list `T`.
 * If `T` is empty, resolves to the empty list `[]`
 */
export type Tail<T extends List> = _Tail<T>