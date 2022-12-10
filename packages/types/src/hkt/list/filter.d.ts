import { List } from "../../list/list";
import { HKT, _, I } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";
import { Unreachable } from "../../_meta/unreachable";
import { Append } from "../../list/append";
import { Concat } from "../../list/concat";
import { ElementOf } from "../../list/element-of";
import { IsEmpty } from "../../list/is-empty";
import { Prepend } from "../../list/prepend";

type __$Filter<P extends HKT<any, boolean>, L extends List, Acc extends List = []> =
  L extends [...infer Init, infer Last]
    ? $<P, Last> extends true
      ? __$Filter<P, Init, Prepend<Acc, Last>>
      : __$Filter<P, Init, Acc>
  : $<P, ElementOf<L>> extends true
    ? Concat<L, Acc>
    : Acc

type _$Filter<P extends HKT<any, boolean>, L extends List, Acc extends List = []> =
  IsEmpty<L> extends true ? Acc
  : L extends readonly [infer H, ...infer T]
    ? $<P, H> extends true
      ? _$Filter<P, T, Append<Acc, H>>
      : _$Filter<P, T, Acc>
  : L extends readonly [...any, any] ? Concat<Acc, __$Filter<P, L>>
  : L extends { 0?: any }
    ? L extends readonly [_?: infer H, ...__: infer T]
      ? $<P, H> extends true
        ? _$Filter<P, T, Append<Acc, H>>
        : _$Filter<P, T, Acc>
      : Unreachable
  : Acc

/**
 * filter through only the elements of list `L` that satisfy predicate `P`.
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to filter
 */
export type $Filter<P extends HKT<any, boolean>, L extends List> =
  _$Filter<P, L>

export interface Filter<P extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<P>>>
  [HKT.o]: $Filter<P, I<this>>
}