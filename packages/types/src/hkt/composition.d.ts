import { If } from "../bool/if"
import { ElementOf } from "../list/element-of"
import { IsEmpty } from "../list/is-empty"
import { List } from "../list/list"
import { Pairs } from "../list/pairs"
import { Reverse } from "../list/reverse"
import { Extends } from "../_meta/extends"
import { Satisfies } from "../_meta/satisfies"
import { HKT, O, I } from "./hkt"
import { $All } from "./list/all"
import { $ } from "./$"

/**
 * checks whether the first element in a pair of hkts can be piped into the second
 */
interface IsPairPipeable extends HKT {
  [HKT.i]: Satisfies<this[HKT._], [HKT, HKT]>
  [HKT.o]: Extends<O<I<this>[0]>, I<I<this>[1]>>
}

/**
 * checks if a list of hkts is composable.
 */
export type $IsPipeable<Kinds extends List<HKT>> =
  $All<
    IsPairPipeable,
    Pairs<Kinds>
  >

/**
 * checks if a list of hkts is composable.
 */
export type $IsComposable<Kinds extends List<HKT>> =
  $All<
    IsPairPipeable,
    Pairs<Reverse<Kinds>>
  >

/**
 * pipes input `X` through list of hkts `Kinds`
 * 
 * Assumes `Kinds` contains no optional elements, as as of the time of this being written (0.1.0),
 *  this type is only used by `$Compose` and `$Pipe`,
 * both of which ensure that the type passed in is composable and don't allow for optional elements
 */
type _$Pipe<Kinds extends List<HKT>, X> =
  IsEmpty<Kinds> extends true ? X
  : Kinds extends [infer H, ...infer T]
    ? _$Pipe<
        Satisfies<T, List<HKT>>,
        $<
          Satisfies<H, HKT>,
          Satisfies<X, I<Satisfies<H, HKT>>>
        >
      >
  : Kinds extends [...infer Init, infer L]
    ? _$Pipe<
        Satisfies<L, List<HKT>>,
        $<
          Satisfies<ElementOf<Init>, HKT>,
          Satisfies<X, I<Satisfies<ElementOf<Satisfies<L, List<HKT>>>, HKT>>>
        >
      >
  : X

export type $Pipe<
  Kinds extends
    If<
      $IsPipeable<Kinds>,
      List<HKT>
    >,
  X
> =
  _$Pipe<Kinds, X>

export interface Pipe<
  Kinds extends
    If<
      $IsPipeable<Kinds>,
      List<HKT>
    >
> extends HKT {
  [HKT.i]: this[HKT._]
  [HKT.o]: $Pipe<Kinds, I<this>>
}


export type $Compose<
  Kinds extends
    If<
      $IsComposable<Kinds>,
      List<HKT>
    >,
  X
> =
  // it's easier to extract the first element of a list than the last so we'll reverse the list and pass that to `_$Pipe`
  $Pipe<Reverse<Kinds>, X>

export interface Compose<
  Kinds extends
    If<
      $IsComposable<Kinds>,
      List<HKT>
    >
> extends HKT {
  [HKT.i]: this[HKT._]
  [HKT.o]: $Compose<Kinds, I<this>>
}
