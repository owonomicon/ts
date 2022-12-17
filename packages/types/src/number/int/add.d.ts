import { Satisfies } from "../../_meta/satisfies"
import { Unreachable } from "../../_meta/unreachable"
import { Length } from "../../list/length"
import { NLengthTuple } from "../../list/n-length-tuple"
import { IsEmpty } from "../../string/is-empty"
import { Reverse } from "../../string/reverse"
import { AsNumber } from "../../string/as-number"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { Negate } from "../negate"
import { _PadZeros } from "./_pad-zeros"
import { ValidateInt, ValidateNonnegInt } from "./_validate"
import { __nomicon_unsafe__Inc } from "./inc"
import { __nomicon_unsafe__SubNonnegInts } from "./sub"

type AdditionTable = [
  [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
  [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10],
  [ 2,  3,  4,  5,  6,  7,  8,  9, 10, 11],
  [ 3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
  [ 4,  5,  6,  7,  8,  9, 10, 11, 12, 13],
  [ 5,  6,  7,  8,  9, 10, 11, 12, 13, 14],
  [ 6,  7,  8,  9, 10, 11, 12, 13, 14, 15],
  [ 7,  8,  9, 10, 11, 12, 13, 14, 15, 16],
  [ 8,  9, 10, 11, 12, 13, 14, 15, 16, 17],
  [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
]
/**
 * TODO: which of these is a more efficient (performance / memory / type complexity) implementation?
 * need to keep type complexity in mind bc already getting quite near "too complex" limit
 */
type AddDigits2<D1 extends number, D2 extends number, Borrow extends boolean> =
  Borrow extends true
    ? __nomicon_unsafe__Inc<AdditionTable[D1][D2]>
    : AdditionTable[D1][D2]

type AddDigits<D1 extends number, D2 extends number, Borrow extends boolean> =
  Satisfies<
    Length<[
      ...NLengthTuple<D1>,
      ...NLengthTuple<D2>,
      ...(Borrow extends true ? [never] : [])
    ]>,
    number
  >

type _Add<S1 extends string, S2 extends string, Borrow extends boolean = false, Acc extends string = ''> =
  S1 extends `${infer D1 extends number}${infer T1}`
    ? S2 extends `${infer D2 extends number}${infer T2}`
      ? `${AddDigits<D1, D2, Borrow>}` extends `${infer N extends number}${infer T}`
        ? IsEmpty<T> extends true
          // produced single digit number -> no carry, `N` has the digit 
          ? _Add<T1, T2, false, `${Acc}${N}`>
          // produced two digit number -> carry, and `T` has the digit
          : _Add<T1, T2, true, `${Acc}${T}`>
        // `AddDigits` will always return a nonnegative integer with at most two digits, which will match against the conditional
        : Unreachable
      // we only ever call `_Add` from `Add`, which ensures the two strings are equal length.
      // since `_Add` also only consumes from both strings at an equal rate,
      //  we know that this branch can never be reached
      : Unreachable
    // if we reach here then we've fully parsed both numbers
    : Borrow extends true
      ? `${Acc}1`
      : Acc
      
/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__AddNonnegInts<N1 extends number, N2 extends number> =
  _PadZeros<N1, N2> extends [infer S1 extends string, infer S2 extends string]
    ? AsNumber<StripLeadingZeros<Reverse<_Add<Reverse<S1>, Reverse<S2>>>>>
    : Unreachable

/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 */
export type AddNonnegInts<N1 extends ValidateNonnegInt<N1>, N2 extends ValidateNonnegInt<N2>> =
   [ValidateNonnegInt<N1>, ValidateNonnegInt<N2>] extends [number, number]
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? __nomicon_unsafe__AddNonnegInts<N1, N2>
      : Unreachable
    : Unreachable

/**
 * adds integer `N2` to integer `N1`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__Add<N1 extends number, N2 extends number> =
  `${N1}` extends `-${infer Abs1 extends number}`
    ? `${N2}` extends `-${infer Abs2 extends number}`
      // -A1 + -A2 = -(A1 + A2)
      ? Negate<__nomicon_unsafe__AddNonnegInts<Abs1, Abs2>>
      // -A1 + N2 = N2 - A1
      : __nomicon_unsafe__SubNonnegInts<N2, Abs1>
    : `${N2}` extends `-${infer Abs2 extends number}`
      // N1 + -A2 = N1 - A2
      ? __nomicon_unsafe__SubNonnegInts<N1, Abs2>
      // N1 + N2
      : __nomicon_unsafe__AddNonnegInts<N1, N2>

/**
 * adds integer `N2` to integer `N1`
 * 
 * validates that `N1 and `N2` are in fact integers
 */
export type Add<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  ValidateInt<N1> extends number
    ? ValidateInt<N2> extends number
      ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
        ? __nomicon_unsafe__Add<N1, N2>
        : Unreachable
      : never
    : never