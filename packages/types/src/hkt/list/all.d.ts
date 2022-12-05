import { List } from "../../list/list";
import { HKT } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

/**
 * checks whether all elements of list `L` satisfy predicate `F`.
 * 
 * an empty list is vacuously satisfied.
 */
export type $All<Kind extends HKT<any, boolean>, L extends List> =
  L extends [infer H, ...infer T]
    ? $<Kind, H> extends true
      ? $All<Kind, T>
      : false
    : true

export interface All<Kind extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<this[HKT._], HKT.I<Kind>[]>
  [HKT.o]: $All<Kind, HKT.I<this>>
}