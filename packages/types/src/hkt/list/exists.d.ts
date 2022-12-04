import { List } from "../../list/list";
import { HKT } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

/**
 * checks whether there exists some element of list `L` that satisfies predicate `Kind`.
 * 
 * an empty list is vacuously unsatisfied (i.e. returns false) 
 * 
 * @param Kind  - HKT predicate to operate on each individual element of `L`
 * @param L     - the list to search
 */
export type $Exists<Kind extends HKT<any, boolean>, L extends List> =
  L extends [infer H, ...infer T]
    ? $<Kind, H> extends true
      ? true
      : $Exists<Kind, T>
    : false

export interface Exists<Kind extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<this[HKT._], HKT.I<Kind>[]>
  [HKT.o]: $Exists<Kind, HKT.I<this>>
}