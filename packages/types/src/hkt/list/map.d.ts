import { List } from "../../list/list";
import { HKT, _, I } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../type/satisfies";
import { Unreachable } from "../../type/unreachable";
import { Append, AppendOptional } from "../../list/append";
import { Concat } from "../../list/concat";
import { ElementOf } from "../../list/element-of";
import { IsEmpty } from "../../list/is-empty";
import { Prepend } from "../../list/prepend";

type __$Map<F extends HKT<any, any>, L extends List, Acc extends List = []> =
  L extends [...infer Init, infer Last]
    ? __$Map<F, Init, Prepend<Acc, $<F, Last>>>
  : Concat<List<$<F, ElementOf<L>>>, Acc>

type _$Map<F extends HKT<any, any>, L extends List, Acc extends List = []> =
  IsEmpty<L> extends true ? Acc
  : L extends readonly [infer H, ...infer T] ? _$Map<F, T, Append<Acc, $<F, H>>>
  : L extends readonly [...any, any] ? Concat<Acc, __$Map<F, L>>
  : L extends { 0?: any }
    ? L extends readonly [_?: infer H, ...__: infer T]
      ? _$Map<F, T, AppendOptional<Acc, $<F, H>>>
      : Unreachable
  : Acc

/**
 * map the elements of list `L` by function `F`.
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to filter
 */
export type $Map<F extends HKT<any, any>, L extends List> =
  _$Map<F, L>

export interface Map<F extends HKT<any, any>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<F>>>
  [HKT.o]: $Map<F, I<this>>
}