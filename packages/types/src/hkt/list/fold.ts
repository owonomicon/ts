import { List } from "../../list"
import { NoInfer, Satisfies, Unreachable } from "../../type"
import { $, HKT, _, I } from ".."

declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<Message extends string> =
  { [TS_TYPE_ERROR]: Message }

type ValidateAccumulatorHkt<F> =
  [F] extends [HKT<[any, any], any>]
    ? [F] extends [HKT<[infer A, infer B], NoInfer<infer A>>]
      ? HKT<[A, B], A>
      : TS_TYPE_ERROR<'Accumulator HKT output must be assignable to input accumulated value'>
    : TS_TYPE_ERROR<'expected HKT of the form (A, B) => A'>

type __$Fold2<F extends HKT<[A, any], A>, L extends List, A, Acc extends A> =
  L extends readonly [infer H, ...infer T]
      ? __$Fold2<F, T, A, $<F, [Acc, H]>>
  : Acc

/**
 * folds over `L` with function `F` and initial value `Initial`.
 * 
 * @warning you probably want to use `$Fold` instead.
 */
type _$Fold2<F extends HKT<[A, any], A>, Initial extends A, L extends List, A>
  = __$Fold2<F, L, A, Initial>

/**
 * folds over `L` with function `F` and initial value `Initial`.
 * 
 * @since 0.0.5
 */
export type $Fold<
  F extends ValidateAccumulatorHkt<F>,
  Initial extends (F extends HKT<[infer A, any], NoInfer<infer A>> ? A : Unreachable),
  L extends (F extends HKT<[infer A, infer B], NoInfer<infer A>> ? List<B> : Unreachable),
> =
  F extends HKT<[infer A, infer B], NoInfer<infer A>>
    ? Initial extends A
      ? L extends List<B>
        ? _$Fold2<F, Initial, L, A>
        : Unreachable
    : Unreachable  
  : Unreachable

/**
 * @since 0.0.5
 * 
 * @todo how to add custom constraints to hkt input? (e.g. ensure only nonvariadics passed in to $<Fold, whatever> and error if not)
 * @todo any way to clean up / reduce redundancy in the code to for custom typechecks here?
 * @todo curry this so can pass initial as separate hkt, this will make it more composable
 */
export interface Fold<
  F extends ValidateAccumulatorHkt<F>,
  Initial extends (F extends HKT<[infer A, any], NoInfer<infer A>> ? A : Unreachable),
> extends HKT {
  [HKT.i]:
    Satisfies<
      _<this>,
      // if F doesn't satisfy the hkt shape, will get type error there,
      // so "suppress" error here by allowing any list,
      // so it's easier to debug what's the root cause of the error
      List<F extends HKT<[infer A, infer B], NoInfer<infer A>> ? B : any>
    >
  [HKT.o]:
    F extends HKT<[infer A, infer B], NoInfer<infer A>>
      ? Initial extends A
        ? I<this> extends List<B>
          ? _$Fold2<F, Initial, I<this>, A>
          : Unreachable
        : Unreachable
      : Unreachable
}