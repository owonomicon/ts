import { AsNumber, Reverse } from "../../string"
import { Unreachable } from "../../type"
import { StripLeadingZeros } from "../string"
import { Negate } from ".."
import { _PadZeros } from "./_pad-zeros"
import { ValidateInt, ValidateNonnegInt } from "./_validate"
import { _Inc, _SubNonneg } from "."

type AdditionDigitTable = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  [2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
  [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
  [4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
  [5, 6, 7, 8, 9, 0, 1, 2, 3, 4],
  [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
  [7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
  [8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // carry row
]

type AdditionCarryTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // carry row
]

/**
 * adds numbers `N1` and `N2` represented in their reverse serialized forms `S1` and `S2`
 */
type __Add<S1 extends string, S2 extends string, Carry extends 0 | 1 = 0, Acc extends string = ''> =
  S1 extends `${infer D1 extends number}${infer T1}`
    ? S2 extends `${infer D2 extends number}${infer T2}`
      ? (Carry extends 1 ? _Inc<D1> : D1) extends (infer D1 extends number)
        ? [AdditionCarryTable[D1][D2], AdditionDigitTable[D1][D2]] extends [infer Carry extends 0 | 1, infer D extends number]
          ? __Add<T1, T2, Carry, `${Acc}${D}`>
          : Unreachable
        : Unreachable
      // we only ever call `__Add` from `_Add`, which ensures the two strings are equal length.
      // since `__Add` also only consumes from both strings at an equal rate,
      //  we know that this branch can never be reached
      : Unreachable
    // if we reach here then we've fully parsed both numbers
    : Carry extends 1
      ? `${Acc}1`
      : Acc
      
/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * @warning you probably want to use `AddNonneg` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _AddNonneg<N1 extends number, N2 extends number> =
  _PadZeros<N1, N2> extends [infer S1 extends string, infer S2 extends string]
    ? AsNumber<StripLeadingZeros<Reverse<__Add<Reverse<S1>, Reverse<S2>>>>>
    : Unreachable

/**
 * adds integer `N2` to integer `N1`
 * 
 * @warning you probably want to use `Add` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _Add<N1 extends number, N2 extends number> =
  `${N1}` extends `-${infer Abs1 extends number}`
    ? `${N2}` extends `-${infer Abs2 extends number}`
      // -A1 + -A2 = -(A1 + A2)
      ? Negate<_AddNonneg<Abs1, Abs2>>
      // -A1 + N2 = N2 - A1
      : _SubNonneg<N2, Abs1>
    : `${N2}` extends `-${infer Abs2 extends number}`
      // N1 + -A2 = N1 - A2
      ? _SubNonneg<N1, Abs2>
      // N1 + N2
      : _AddNonneg<N1, N2>

      
/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 * 
 * @since 0.0.2
 */
export type AddNonneg<N1 extends ValidateNonnegInt<N1, 'N1'>, N2 extends ValidateNonnegInt<N2, 'N2'>> =
  [ValidateNonnegInt<N1>, ValidateNonnegInt<N2>] extends [number, number]
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? _AddNonneg<N1, N2>
      : Unreachable
    : never
  
/**
 * adds integer `N2` to integer `N1`
 *
 * validates that `N1 and `N2` are in fact integers
 * 
 * @since 0.0.2
 */
export type Add_Safe<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  [ValidateInt<N1>, ValidateInt<N2>] extends [number, number] 
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? _Add<N1, N2>
      : Unreachable
    : never

