import { Unreachable } from "../../type/unreachable"
import { AsNumber } from "../../string/as-number"
import { Reverse } from "../../string/reverse"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { DecPos } from "./dec"

type AdditionDigitMap =
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

/**
 * "increments" the string produced from reversing a stringified nonnegative integer.
 * e.g. `_Inc<"9"> = "01"` since `"9"` represents `9` and `"01"` represents `10`
 */
type _Inc<S extends string> =
  S extends '9' ? '01'
  : S extends `${infer D extends number}${infer T}`
    ? D extends 9
      ? `0${_Inc<T>}`
      : `${AdditionDigitMap[D]}${T}`
    // invariant -- initial call to `_Inc` is a stringified integer i.e. nonempty
    // then we only recurse when the current digit `D` is 9;
    //  but since we also explicitly check if `S` is exactly `9`, we know the tail must be nonempty
    : Unreachable

/**
 * increments nonnegative integer `N`
 */
export type IncNonneg<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<_Inc<Reverse<`${N}`>>>>>

/**
 * increments integer `N`
 */
export type Inc<N extends number> =
  `${N}` extends (infer S extends string)
    ? S extends '-1' ? 0
      // `-0` serializes to `"0"` so it properly doesnt get handled here where it'd be passed to `PosDec`
      : S extends `-${infer Abs extends number}` ? AsNumber<`-${DecPos<Abs>}`>
      : IncNonneg<N>
    : Unreachable

