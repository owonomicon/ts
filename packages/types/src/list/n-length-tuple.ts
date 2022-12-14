import { IsLiteral } from "../number/is-literal"
import { Append } from "./append"
import { Length } from "./length"

type _NLengthTuple<N extends number, Acc extends never[] = []> =
  Length<Acc> extends N
    ? Acc
    : _NLengthTuple<N, Append<Acc, never>>

/**
 * constructs an N-length tuple of `never`s
 */
export type NLengthTuple<N extends number> =
  IsLiteral<N> extends true
    ? _NLengthTuple<N>
    : never[]