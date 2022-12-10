import { List } from "../../list/list";
import { HKT, _, I } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

/**
 * checks whether there exists some element of list `L` that satisfies predicate `P`.
 * 
 * an empty list is vacuously unsatisfied (i.e. returns false) 
 * 
 * @param P   - HKT predicate to operate on each individual element of `L`
 * @param L   - the list to search
 */
export type $Exists<P extends HKT<any, boolean>, L extends List> =
  L extends readonly [infer H, ...infer T]
    ? $<P, H> extends true
      ? true
      : $Exists<P, T>
    : false

export interface Exists<P extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<_<this>, List<I<P>>>
  [HKT.o]: $Exists<P, I<this>>
}