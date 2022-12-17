import { Unreachable } from "../../_meta/unreachable"
import { And } from "../../bool/and"
import { Reverse } from "../../string/reverse"
import { AsNumber } from "../../string/as-number"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { Negate } from "../negate"
import { _PadZeros } from "./_pad-zeros"
import { ValidateInt, ValidateNonnegInt } from "./_validate"
import { __nomicon_unsafe__AddNonnegInts } from "./add"
import { __nomicon_unsafe__PosDec } from "./dec"

/**
 * list mapping digits to the resultant digit for subtraction. used to compute `D1 - D2` when `D2 > D1`:
 *  the resultant digit is `TenMinus[D2 - D1]` 
 */
type TenMinus = [never, 9, 8, 7, 6, 5, 4, 3, 2, 1]

type _Max<D1 extends number, D2 extends number, O1 = D1, O2 = D2> =
  D1 extends 0 ? O2
  : D2 extends 0 ? O1
  : _Max<__nomicon_unsafe__PosDec<D1>, __nomicon_unsafe__PosDec<D2>, O1, O2>
 
/**
 * finds the greater of digits `D1` and `D2`
 * since it assumes inputs are single digits, does not necessarily work on larger numbers due to recursion limit
*/
type Max<D1 extends number, D2 extends number> =
   D1 extends D2
     // shortcut the case where they are the same digit
     ? D1
     : _Max<D1, D2>
 
type BorrowDigit = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]
 
type SubtractionTable = [
  [0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
  [1,  0, -1, -2, -3, -4, -5, -6, -7, -8],
  [2,  1,  0, -1, -2, -3, -4, -5, -6, -7],
  [3,  2,  1,  0, -1, -2, -3, -4, -5, -6],
  [4,  3,  2,  1,  0, -1, -2, -3, -4, -5],
  [5,  4,  3,  2,  1,  0, -1, -2, -3, -4],
  [6,  5,  4,  3,  2,  1,  0, -1, -2, -3],
  [7,  6,  5,  4,  3,  2,  1,  0, -1, -2],
  [8,  7,  6,  5,  4,  3,  2,  1,  0, -1],
  [9,  8,  7,  6,  5,  4,  3,  2,  1,  0],
]

declare const __NEGATIVE__: unique symbol
type __NEGATIVE__ = typeof __NEGATIVE__

type _Sub<S1 extends string, S2 extends string, Borrow extends boolean = false, Acc extends string = ''> =
  S1 extends `${infer D1 extends number}${infer T1}`
    ? S2 extends `${infer D2 extends number}${infer T2}`
      ? (Borrow extends true ? BorrowDigit[D1] : D1) extends (infer D extends number)
        ? D extends Max<D, D2>
          // `D >= D2` so we can just directly use subtraction table.
          // we also know that we only need to borrow from the next digit if the original digit `D1` was 0 and we had to borrow from it
          ? _Sub<T1, T2, And<Borrow, D1 extends 0 ? true : false>, `${Acc}${SubtractionTable[D][D2]}`>
          // `D < D2` so we know we have to borrow from the next digit.
          // to compute the resultant digit of `D - D2`, we get `D - D2 + 10 = 10 - (D2 - D)`
          : _Sub<T1, T2, true, `${Acc}${TenMinus[SubtractionTable[D2][D]]}`>
        : Unreachable
      // we only ever call `_Sub` from `Sub`, which ensures the two strings are equal length.
      // since `_Sub` also only consumes from both strings at an equal rate,
      //  we know that this branch can never be reached
      : Unreachable
    // if we reach here then we've fully parsed both numbers
    : Borrow extends true
      // if still needed to borrow then N2 > N1. we'll handle this case back in `Sub`
      ? __NEGATIVE__
      // otherwise we have our result `Acc`
      : Acc
 
/**
 * subtracts nonnegative integer `N2` from nonnegative integer `N1`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__SubNonnegInts<N1 extends number, N2 extends number> =
  _PadZeros<N1, N2> extends [`${infer S1}`, `${infer S2}`]
      // calculate the result
      ? _Sub<Reverse<S1>, Reverse<S2>> extends infer X
        ? X extends string
          // if its a string then it computed the result properly
          ? AsNumber<StripLeadingZeros<Reverse<X>>>
          // otherwise the result was negative, i.e. N2 > N1. so we'll just compute N2 - N1 and make that negative
          : Negate<__nomicon_unsafe__Sub<N2, N1>>
        : Unreachable
      : Unreachable

/**
 * subtracts nonnegative integer `N2` from nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 */
export type SubNonnegInts<N1 extends ValidateNonnegInt<N1>, N2 extends ValidateNonnegInt<N2>> =
  [N1, N2] extends [infer N1 extends number, infer N2 extends number]
    ? __nomicon_unsafe__SubNonnegInts<N1, N2>
    : Unreachable

/**
 * subtracts integer `N2` from integer `N1`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__Sub<N1 extends number, N2 extends number> =
  `${N1}` extends `-${infer Abs1 extends number}`
    ? `${N2}` extends `-${infer Abs2 extends number}`
      // -A1 - -A2 = A2 - A1
      ? __nomicon_unsafe__SubNonnegInts<Abs2, Abs1>
      // -A1 - N2 = -(A1 + N2)
      : Negate<__nomicon_unsafe__AddNonnegInts<Abs1, N2>>
    : `${N2}` extends `-${infer Abs2 extends number}`
      // N1 - -A2 = N1 + A2
      ? __nomicon_unsafe__AddNonnegInts<N1, Abs2>
      // N1 - N2
      : __nomicon_unsafe__SubNonnegInts<N1, N2>

/**
 * subtracts integer `N2` from integer `N1`
 * 
 * validates that `N1 and `N2` are in fact integers
 */
export type Sub<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  ValidateInt<N1> extends number
    ? ValidateInt<N2> extends number
      ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
        ? __nomicon_unsafe__Sub<N1, N2>
        : Unreachable
      : never
    : never