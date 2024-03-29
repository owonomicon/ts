import { If } from "../boolean"
import { ElementOf, IsEmpty, List, Pairs, Reverse } from "../list"
import { Extends, MutuallyAssignable, Satisfies } from "../type"
import { $, HKT, _, I, O } from "."
import { $All } from "./list"

/**
 * checks whether the first element in a pair of hkts can be piped into the second
 */
interface IsPairPipeable extends HKT {
  [HKT.i]: Satisfies<_<this>, [HKT, HKT]>
  [HKT.o]: Extends<O<I<this>[0]>, I<I<this>[1]>>
}

/**
 * checks if a list of hkts is composable
 * 
 * @since 0.0.2
 */
export type $IsPipeable<Kinds extends List<HKT>> =
  MutuallyAssignable<
    true,
    $All<
      IsPairPipeable,
      Pairs<Kinds>
    >
  >

/**
 * checks if a list of hkts is composable
 * 
 * @since 0.0.2
 */
export type $IsComposable<Kinds extends List<HKT>> =
  MutuallyAssignable<
    true,
    $All<
      IsPairPipeable,
      Pairs<Reverse<Kinds>>
    >
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

/**
 * pipes `X` through HKTs `Kinds` and returns the resultant type
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * // some sample kinds for transforming an input
 * type sb = HKT<string, boolean>
 * type sn = HKT<string, number>
 * type ss = HKT<string, string>
 * type nb = HKT<number, boolean>
 * type nn = HKT<number, number>
 * type ns = HKT<number, string>
 * 
 * type e0 = $Pipe<[], never>                             // never
 * type e1 = $Pipe<[], string>                            // string
 * type e2 = $Pipe<ss[], string>                          // string
 * type e3 = $Pipe<[sn], string>                          // number
 * type e4 = $Pipe<[sn, nb], string>                      // boolean
 * type e5 = $Pipe<[...ss[], sn], string>                 // number
 * type e6 = $Pipe<[sn, ...nn[]], string>                 // number
 * type e7 = $Pipe<[sn, ...nn[], nb], string>             // boolean
 * type e8 = $Pipe<sn[], string>                          // Type 'sn[]' does not satisfy the constraint 'never'.ts(2344)
 * type e9 = $Pipe<[sn, ...nn[], (ns | sn), sb], string>  // Type '[sn, ...nn[], sn | ns, sb]' does not satisfy the constraint 'never'.ts(2344)
 * type e10 = $Pipe<[sn, ...nn[], (ns | sn), nb], string> // Type '[sn, ...nn[], sn | ns, nb]' does not satisfy the constraint 'never'.ts(2344
 * type e11 = $Pipe<[sn, ...(ns | sn)[]], string>         // Type '[sn, ...(sn | ns)[]]' does not satisfy the constraint 'never'.ts(2344)
 * ```
 */
export type $Pipe<
  Kinds extends
    If<
      $IsPipeable<Kinds>,
      List<HKT>
    >,
  X
> =
  _$Pipe<Kinds, X>

/**
 * @since 0.0.2
 */
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

/**
 * @since 0.0.2
 */
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

/**
 * @since 0.0.2
 */
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

