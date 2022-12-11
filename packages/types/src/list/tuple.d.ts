import { Append } from "./append"


// generator
type _Tuple<T, N extends number, Acc extends T[] = []> =
  N extends Acc['length']
    ? Acc
    : _Tuple<T, N, Append<Acc, T>>

/**
 * N-length tuple of elements of type T
 */
export type Tuple<T, N extends number> = _Tuple<T, N>
