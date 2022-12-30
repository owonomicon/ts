import { If } from "../bool/if"
import { ElementOf } from "../list/element-of"
import { IsEmpty } from "../list/is-empty"
import { List } from "../list/list"
import { Pairs } from "../list/pairs"
import { Reverse } from "../list/reverse"
import { Extends } from "../type/extends"
import { Satisfies } from "../type/satisfies"
import { HKT, _, I, O } from "./hkt"
import { $All } from "./list/all"
import { $ } from "./$"

/**
 * checks whether the first element in a pair of hkts can be piped into the second
 */
interface IsPairPipeable extends HKT {
  [HKT.i]: Satisfies<_<this>, [HKT, HKT]>
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
type __$Pipe<Kinds extends List<HKT>, X> =
  IsEmpty<Kinds> extends true ? X
  : Kinds extends readonly [infer H, ...infer T]
    ? __$Pipe<
        Satisfies<T, List<HKT>>,
        $<
          Satisfies<H, HKT>,
          Satisfies<X, I<Satisfies<H, HKT>>>
        >
      >
  : Kinds extends readonly [...infer Init, infer L]
    ? __$Pipe<
        Satisfies<L, List<HKT>>,
        $<
          Satisfies<ElementOf<Init>, HKT>,
          Satisfies<X, I<Satisfies<ElementOf<Satisfies<L, List<HKT>>>, HKT>>>
        >
      >
  : X

/**
 * loosely typed `Pipe` that doesn't validate that the input type is pipeable.
 * 
 * exists mostly because `Compose` uses `Pipe` logic but TS can't properly detect that if `L` is composable then `Rev<L>` is pipeable
 */
type _$Pipe<Kinds extends List<HKT>, X> = __$Pipe<Kinds, X>

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
  [HKT.i]: _<this>
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
  _$Pipe<Reverse<Kinds>, X>

export interface Compose<
  Kinds extends
    If<
      $IsComposable<Kinds>,
      List<HKT>
    >
> extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: $Compose<Kinds, I<this>>
}
