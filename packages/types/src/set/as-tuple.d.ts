import { IsNever } from "../any/is-never"
import { Append } from "../list/append"
import { Unreachable } from "../_meta/unreachable"
import { AsIntersection } from "./as-intersection"

type _PickMember<U> =
  AsIntersection<
    U extends unknown
      ? (_: U) => 0
      : Unreachable
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