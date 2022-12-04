import { And } from "../../bool/and";
import { List } from "../../list/list";
import { HKT } from "../hkt";
import { $ } from "../$";
import { Satisfies } from "../../_meta/satisfies";

type _$All<Kind extends HKT<any, boolean>, L extends List, Acc extends boolean = true> =
  L extends [infer H, ...infer T] ? _$All<Kind, T, And<Acc, $<Kind, H>>>
  : Acc

/**
 * checks whether all elements of list `L` satisfy predicate `F`.
 * 
 * an empty list is vacuously satisfied.
 */
export type $All<Kind extends HKT<any, boolean>, L extends List> =
  _$All<Kind, L>


export interface All<Kind extends HKT<any, boolean>> extends HKT {
  [HKT.i]: Satisfies<this[HKT._], HKT.I<Kind>[]>
  [HKT.o]: $All<Kind, HKT.I<this>>
}