import { Append, Concat, Length } from "."

// generator
type _AtLeastNElements<T, N extends number, Acc extends T[] = []> =
  Length<Acc> extends N
    ? Concat<Acc, T[]>
    : _AtLeastNElements<T, N, Append<Acc, T>>

/**
 * a `T[]` with at least `N` elements inside of it
 */
export type AtLeastNElements<T, N extends number> = _AtLeastNElements<T, N>

/**
 * a nonempty `T[]`
 */
export type Nonempty<T> = AtLeastNElements<T, 1>