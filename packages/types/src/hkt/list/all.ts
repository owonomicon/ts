import { ElementOf, IsEmpty, List } from "../../list"
import { Satisfies, Unreachable } from "../../type"
import { $, HKT, _, I } from ".."

type _$All<P extends HKT<any, boolean>, L extends List> =
  L extends readonly [...infer Init, infer Last]
    ? $<P, Last> extends true
      ? _$All<P, Init>
      : false
  : $<P, ElementOf<L>> extends true
    ? true
    : false

/**
 * checks whether all elements of list `L` satisfy predicate `P`.
 * 
 * an empty list is vacuously satisfied (i.e. returns true)
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to search
 * 
 * @since 0.0.2
 */
export type $All<P extends HKT<any, boolean>, L extends List> =
  IsEmpty<L> extends true ? true
  : L extends readonly [infer H, ...infer T]
    ? $<P, H> extends true
      ? $All<P, T>
      : false
  : L extends readonly [...any, any] ? _$All<P, L>
  : L extends { 0?: any }
    ? L extends readonly [_?: infer H, ...__: infer T]
      ? $<P, H> extends true
        ? $All<P, T>
        : false
      : Unreachable
  : $<P, ElementOf<L>> extends true
    ? true
    : false

/**
 * checks whether all elements of the input list satisfy predicate `P`
 * 
 * an empty list is vacuously satisfied (i.e. returns false)
 * 
 * @since 0.0.2
 */
export interface All<P extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<P>>>
  [HKT.o]: $All<P, I<this>>
}