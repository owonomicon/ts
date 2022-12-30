import { List } from "../../list/list"
import { HKT, _, I } from "../hkt"
import { $ } from "../$"
import { Satisfies } from "../../type/satisfies"
import { Unreachable } from "../../type/unreachable"
import { ElementOf } from "../../list/element-of"
import { IsEmpty } from "../../list/is-empty"

type _$Exists<P extends HKT<any, boolean>, L extends List> =
  L extends readonly [...infer Init, infer Last]
    ? $<P, Last> extends true
      ? true
      : _$Exists<P, Init>
  : $<P, ElementOf<L>> extends true
    ? true
    : false

/**
 * checks whether there exists some element of list `L` that satisfies predicate `P`.
 * 
 * an empty list is vacuously unsatisfied (i.e. returns false) 
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to search
 */
export type $Exists<P extends HKT<any, boolean>, L extends List> =
  IsEmpty<L> extends true ? false
  : L extends readonly [infer H, ...infer T]
    ? $<P, H> extends true
      ? true
      : $Exists<P, T>
  : L extends readonly [...any, any] ? _$Exists<P, L>
  : L extends { 0?: any }
    ? L extends readonly [_?: infer H, ...__: infer T]
      ? $<P, H> extends true
        ? true
        : $Exists<P, T>
      : Unreachable
  : false
  /* TODO: what behavior do we want for variadic lists?
   * since list might be empty we could simply not consider it -> return `false`. (this is the current behavior)
   * or, we could assume its nonempty and return `true` if `P` matches its element type. (e.g. "there exists an element of string[] that extends string" -> should return true no?)
   * or, we could return `true | false` = `boolean` to reflect the ambiguity
   */
  // : $<P, ElementOf<L>> extends true
  //   ? true
  //   : false

export interface Exists<P extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<P>>>
  [HKT.o]: $Exists<P, I<this>>
}