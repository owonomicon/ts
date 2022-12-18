
import { IncNonneg } from "../number/int/inc"
import { Length } from "./length"
import { List } from "./list"

type _OmitFirstN<T extends List, N extends number, NOmitted extends number = 0> =
  NOmitted extends N ? T
  : Length<T> extends 0 ? T
  : T extends readonly [any, ...infer Tail] ? _OmitFirstN<Tail, N, IncNonneg<NOmitted>> // capture nonempty lists that aren't <variadic tuples with leading spread element>
  : T extends readonly [...any, any] ? T // capture variadic tuples with leading spread element
  : T extends readonly [any?, ...infer Tail] ? _OmitFirstN<Tail, N, IncNonneg<NOmitted>> // capture nonempty lists that aren't <variadic tuples with leading spread element> and have optional argument. this comes after leading spread variadic tuple because this "matches" leading spread variadic tuples but converts them to `unknown[]`
  : never

/**
 * omits the first `N` elements of list `T`.
 * works with arbitrary lists, variadic tuples, etc.
 * does not do anything to spread elements encountered in the front.
 */
export type OmitFirstN<L extends List, N extends number> = _OmitFirstN<L, N>

/**
 * omits the first element of list `L`.
 * 
 * @see {@link OmitFirstN}
 */
export type OmitFirst<L extends List> = OmitFirstN<L, 1>