
import { _IncNonneg } from "../number/int/inc"
import { Length } from "./length"
import { List } from "./list"

type _Slice<T extends List, N extends number, I extends number = 0> =
  I extends N ? T
  : Length<T> extends 0 ? T
  : T extends readonly [any, ...infer Tail] ? _Slice<Tail, N, _IncNonneg<I>>
  : T extends readonly [...any, any] ? T
  : T extends readonly [any?, ...infer Tail] ? _Slice<Tail, N, _IncNonneg<I>>
  : never

/**
 * omits the first `N` elements of list `T`.
 * works with arbitrary lists, variadic tuples, etc.
 * does not do anything to spread elements encountered in the front.
 * 
 * @todo support end index
 * @todo support negative indexes
 * @todo add integer type constraint
 * @todo establish some behavior for what to do with variadic tuples
 */
export type Slice<L extends List, N extends number> = _Slice<L, N>

/**
 * omits the first element of list `L`.
 * 
 * @see {@link Slice}
 */
export type SliceFirst<L extends List> = Slice<L, 1>