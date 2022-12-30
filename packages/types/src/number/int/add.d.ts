import { AsNumber } from "../../string/as-number"
import { Reverse } from "../../string/reverse"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { Unreachable } from "../../type/unreachable"
import { Negate } from "../negate"
import { _PadZeros } from "./_pad-zeros"
import { Inc } from "./inc"
import { SubNonneg } from "./sub"

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

type _Add<S1 extends string, S2 extends string, Carry extends 0 | 1 = 0, Acc extends string = ''> =
  S1 extends `${infer D1 extends number}${infer T1}`
    ? S2 extends `${infer D2 extends number}${infer T2}`
      ? (Carry extends 1 ? Inc<D1> : D1) extends (infer D1 extends number)
        ? [AdditionCarryTable[D1][D2], AdditionDigitTable[D1][D2]] extends [infer Carry extends 0 | 1, infer D extends number]
          ? _Add<T1, T2, Carry, `${Acc}${D}`>
          : Unreachable
        : Unreachable
      // we only ever call `_Add` from `Add`, which ensures the two strings are equal length.
      // since `_Add` also only consumes from both strings at an equal rate,
      //  we know that this branch can never be reached
      : Unreachable
    // if we reach here then we've fully parsed both numbers
    : Carry extends 1
      ? `${Acc}1`
      : Acc
      
/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type AddNonneg<N1 extends number, N2 extends number> =
  _PadZeros<N1, N2> extends [infer S1 extends string, infer S2 extends string]
    ? AsNumber<StripLeadingZeros<Reverse<_Add<Reverse<S1>, Reverse<S2>>>>>
    : Unreachable

/**
 * adds integer `N2` to integer `N1`
 */
export type Add<N1 extends number, N2 extends number> =
  `${N1}` extends `-${infer Abs1 extends number}`
    ? `${N2}` extends `-${infer Abs2 extends number}`
      // -A1 + -A2 = -(A1 + A2)
      ? Negate<AddNonneg<Abs1, Abs2>>
      // -A1 + N2 = N2 - A1
      : SubNonneg<N2, Abs1>
    : `${N2}` extends `-${infer Abs2 extends number}`
      // N1 + -A2 = N1 - A2
      ? SubNonneg<N1, Abs2>
      // N1 + N2
      : AddNonneg<N1, N2>

