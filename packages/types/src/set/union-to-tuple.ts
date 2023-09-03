import { IsNever } from "../type"
import { Member } from "."

type _UnionToTuple<U, Acc extends any[] = [], M = Member<U>> =
  IsNever<U> extends true
    ? Acc
    : _UnionToTuple<Exclude<U, M>, [...Acc, M]>

/**
 * converts union `U` into a tuple of its constituent members.
 * @warning PROVIDES NO GUARANTEES ABOUT ORDER
 */
export type UnionToTuple<U> =
  _UnionToTuple<U>