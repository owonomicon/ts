
import { Increment, Iterate, Iteration, Value } from "../_meta/iterate"
import { Length } from "./length"
import { List } from "./list"

type _OmitFirstN<T extends List, N extends number, A extends Iteration = Iterate<0>> =
  Length<T> extends 0
    ? T
    : T extends [any?, ...infer V] | readonly [any?, ...infer V]
      ? Value<A> extends N
        ? T
        : _OmitFirstN<V, N, Increment<A>>
      : never

/**
 * omits the first `N` elements of tuple `T`
 * @warning doesn't seem to work with variadic tuples
 */
export type OmitFirstN<T extends List, N extends number> = _OmitFirstN<T, N>

/**
 * omits the first element of tuple `T`
 */
export type OmitFirst<T extends List> = OmitFirstN<T, 1>