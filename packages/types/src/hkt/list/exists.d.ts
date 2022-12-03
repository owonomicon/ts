import { Bool } from "../../bool/bool";
import { List } from "../../list/list";
import { HKT } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

/**
 * checks whether there exists some element of list `L` that satisfies predicate `Kind`.
 * 
 * returns `1` if some element satisfies, `0` otherwise.
 * 
 * an empty list is vacuously unsatisfied (i.e. returns `0`) 
 * 
 * @param Kind  - HKT predicate to operate on each individual element of `L`
 * @param L     - the list to search
 */
export type $Exists<Kind extends HKT<any, Bool>, L extends List> =
  L extends [infer H, ...infer T]
    ? $<Kind, H> extends 1
      ? 1
      : $Exists<Kind, T>
    : 0

export interface Exists<Kind extends HKT<any, Bool>> extends HKT {
  [HKT.i]: Satisfies<this[HKT._], HKT.I<Kind>[]>
  [HKT.o]: $Exists<Kind, HKT.I<this>>
}