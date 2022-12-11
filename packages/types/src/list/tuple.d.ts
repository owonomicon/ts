import { Append } from "./append"


// generator
type _Tuple<T, N extends number, A extends T[] = []> =
  N extends A['length']
    ? A
    : _Tuple<T, N, Append<A, T>>

/**
 * N-length tuple of elements of type T
 */
export type Tuple<T, N extends number> = _Tuple<T, N>
