import { Append } from "../list/append"
import { IsNever } from "../type/is-never"
import { Unreachable } from "../type/unreachable"
import { AsIntersection } from "./as-intersection"

type _PickMember<U> =
  // 2. convert these functions into an intersection, which gets interpreted as an overloaded function...
  AsIntersection<
    // 1. distribute `U` into separate functions...
    U extends unknown ? (_: U) => 0 : Unreachable
  // 3. and capture the "last" overload
  > extends (_: infer M) => 0
    ? M
    : Unreachable

type _AsTuple<U, Acc extends any[] = [], M = _PickMember<U>> =
  IsNever<U> extends true
    ? Acc
    : _AsTuple<Exclude<U, M>, Append<Acc, M>>

/**
 * converts union `U` into a tuple of its constituent members.
 * @warning PROVIDES NO GUARANTEES ABOUT ORDER
 */
export type AsTuple<U> =
  _AsTuple<U>