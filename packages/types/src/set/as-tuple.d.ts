import { Append } from "../list/append"
import { AsIntersection } from "./as-intersection"

type _PickMember<U> =
  AsIntersection<
    U extends unknown
      ? (_: U) => 0
      : never
  > extends (_: infer M) => 0
    ? M
    : never

type _AsTuple<U, Acc extends any[] = [], M = _PickMember<U>> =
  [U] extends [never] // IsNever
    ? Acc
    : _AsTuple<Exclude<U, M>, Append<Acc, M>>

/**
 * converts union `U` into a tuple of its constituent members.
 * @warning PROVIDES NO GUARANTEES ABOUT ORDER
 */
export type AsTuple<U> =
  _AsTuple<U>