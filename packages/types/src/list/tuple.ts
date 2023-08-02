import { IsLiteral } from "../number"
import { Append, Length } from "."
import { IsNever } from "../type"

type _Tuple<T, N extends number, Acc extends T[] = []> =
  Length<Acc> extends N
    ? Acc
    : _Tuple<T, N, Append<Acc, T>>

/**
 * constructs an tuple with elements of type `T` and size of `N`.
 * 
 * @param {*} [T=never] - element type
 * @param {number} [N=never] - size of tuple. if `never`, produces a `T[]` instead
 * 
 * @since 0.0.6
 */
export type Tuple<T = never, N extends number = never> =
  IsNever<N> extends true ? T[]
  : IsLiteral<N> extends true ? _Tuple<T, N>
  : T[]