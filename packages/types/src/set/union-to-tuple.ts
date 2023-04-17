import { Append } from "../list"
import { IsNever, Unreachable } from "../type"
import { UnionToIntersection } from "."

type _PickMember<U> =
  // 2. convert these functions into an intersection, which gets interpreted as an overloaded function...
  UnionToIntersection<
    // 1. distribute `U` into separate functions...
    U extends unknown ? (_: U) => 0 : Unreachable
  // 3. and capture the "last" overload
  > extends (_: infer M) => 0
    ? M
    : Unreachable

type _UnionToTuple<U, Acc extends any[] = [], M = _PickMember<U>> =
  IsNever<U> extends true
    ? Acc
    : _UnionToTuple<Exclude<U, M>, Append<Acc, M>>

/**
 * converts union `U` into a tuple of its constituent members.
 * @warning PROVIDES NO GUARANTEES ABOUT ORDER
 */
export type UnionToTuple<U> =
  _UnionToTuple<U>