import { And } from "../../boolean"
import { AsNumber, Reverse } from "../../string"
import { Unreachable } from "../../type"
import { StripLeadingZeros } from "../string"
import { Negate } from ".."
import { _PadZeros } from "./_pad-zeros"
import { ValidateNonnegInt, ValidateInt } from "./_validate"
import { _AddNonneg, _DecPos } from "."

/**
 * list mapping digits to the resultant digit for subtraction. used to compute `D1 - D2` when `D2 > D1`:
 *  the resultant digit is `TenMinus[D2 - D1]` 
 */
type TenMinus = [never, 9, 8, 7, 6, 5, 4, 3, 2, 1]

type _Max<D1 extends number, D2 extends number, O1 = D1, O2 = D2> =
  D1 extends 0 ? O2
  : D2 extends 0 ? O1
  : _Max<_DecPos<D1>, _DecPos<D2>, O1, O2>
 
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

/**
 * subtracts integer `N2` from integer `N1`, represented in their reverse serialized forms `S1` and `S2`
 */
type __Sub<S1 extends string, S2 extends string, Borrow extends boolean = false, Acc extends string = ''> =
  S1 extends `${infer D1 extends number}${infer T1}`
    ? S2 extends `${infer D2 extends number}${infer T2}`
      ? (Borrow extends true ? BorrowDigit[D1] : D1) extends (infer D extends number)
        ? D extends Max<D, D2>
          // `D >= D2` so we can just directly use subtraction table.
          // we also know that we only need to borrow from the next digit if the original digit `D1` was 0 and we had to borrow from it
          ? __Sub<T1, T2, And<Borrow, D1 extends 0 ? true : false>, `${Acc}${SubtractionTable[D][D2]}`>
          // `D < D2` so we know we have to borrow from the next digit.
          // to compute the resultant digit of `D - D2`, we get `D - D2 + 10 = 10 - (D2 - D)`
          : __Sub<T1, T2, true, `${Acc}${TenMinus[SubtractionTable[D2][D]]}`>
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
 * @warning you probably want to use `SubNonneg` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _SubNonneg<N1 extends number, N2 extends number> =
  _PadZeros<N1, N2> extends [`${infer S1}`, `${infer S2}`]
      // calculate the result
      ? __Sub<Reverse<S1>, Reverse<S2>> extends infer X
        ? X extends string
          // if its a string then it computed the result properly
          ? AsNumber<StripLeadingZeros<Reverse<X>>>
          // otherwise the result was negative, i.e. N2 > N1. so we'll just compute N2 - N1 and make that negative
          : Negate<_SubNonneg<N2, N1>>
        : Unreachable
      : Unreachable

/**
 * subtracts integer `N2` from integer `N1`
 * 
 * @warning you probably want to use `Sub` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _Sub<N1 extends number, N2 extends number> =
  `${N1}` extends `-${infer Abs1 extends number}`
    ? `${N2}` extends `-${infer Abs2 extends number}`
      // -A1 - -A2 = A2 - A1
      ? _SubNonneg<Abs2, Abs1>
      // -A1 - N2 = -(A1 + N2)
      : Negate<_AddNonneg<Abs1, N2>>
    : `${N2}` extends `-${infer Abs2 extends number}`
      // N1 - -A2 = N1 + A2
      ? _AddNonneg<N1, Abs2>
      // N1 - N2
      : _SubNonneg<N1, N2>

/**
 * subtracts nonnegative integer `N2` from nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 * 
 * @since 0.0.2
 */
export type SubNonneg_Safe<N1 extends ValidateNonnegInt<N1, 'N1'>, N2 extends ValidateNonnegInt<N2, 'N2'>> =
  [ValidateNonnegInt<N1>, ValidateNonnegInt<N2>] extends [number, number]
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? _SubNonneg<N1, N2>
      : Unreachable
    : never

/**
 * subtracts integer `N2` from integer `N1`
 *
 * validates that `N1 and `N2` are in fact integers
 * 
 * @since 0.0.2
 */
export type Sub_Safe<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  [ValidateInt<N1>, ValidateInt<N2>] extends [number, number]
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? _Sub<N1, N2>
      : Unreachable
    : never