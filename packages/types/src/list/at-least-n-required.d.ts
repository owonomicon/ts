import { Append } from "./append"
import { Concat } from "./concat"
import { Length } from "./length"

// generator
type _AtLeastNElements<T, N extends number, A extends T[] = []> =
  Length<A> extends N
    ? Concat<A, T[]>
    : _AtLeastNElements<T, N, Append<A, T>>

/**
 * a `T[]` with at least `N` elements inside of it
 */
export type AtLeastNElements<T, N extends number> = _AtLeastNElements<T, N>

/**
 * a nonempty `T[]`
 */
export type Nonempty<T> = AtLeastNElements<T, 1>