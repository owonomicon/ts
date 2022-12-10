import { List } from "../../list/list";
import { HKT, _, I } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

/**
 * checks whether all elements of list `L` satisfy predicate `P`.
 * 
 * an empty list is vacuously satisfied (i.e. returns true)
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to search
 */
export type $All<P extends HKT<any, boolean>, L extends List> =
  L extends readonly [infer H, ...infer T]
    ? $<P, H> extends true
      ? $All<P, T>
      : false
    : true

export interface All<P extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<P>>>
  [HKT.o]: $All<P, I<this>>
}