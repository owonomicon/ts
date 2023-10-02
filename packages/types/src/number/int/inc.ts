import { AsNumber, Reverse } from "../../string"
import { Unreachable } from "../../type"
import { StripLeadingZeros } from "../string"
import { ValidateNonnegInt, ValidateInt } from "./_validate"
import { _DecPos } from "."

type AdditionDigitMap =
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

/**
 * "increments" the string produced from reversing a stringified nonnegative integer.
 * e.g. `__Inc<"9"> = "01"` since `"9"` represents `9` and `"01"` represents `10`
 */
type __Inc<S extends string> =
  S extends '9' ? '01'
  : S extends `${infer D extends number}${infer T}`
    ? D extends 9
      ? `0${__Inc<T>}`
      : `${AdditionDigitMap[D]}${T}`
    // invariant -- initial call to `_Inc` is a stringified integer i.e. nonempty
    // then we only recurse when the current digit `D` is 9;
    //  but since we also explicitly check if `S` is exactly `9`, we know the tail must be nonempty
    : Unreachable

/**
 * increments nonnegative integer `N`
 * 
 * @warning you probably want to use `IncNonneg` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _IncNonneg<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<__Inc<Reverse<`${N}`>>>>>

/**
 * increments integer `N`
 * 
 * @warning you probably want to use `Inc` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _Inc<N extends number> =
  `${N}` extends (infer S extends string)
    ? S extends '-1' ? 0
      // `-0` serializes to `"0"` so we don't need to worry about handling it as a special case
      : S extends `-${infer Abs extends number}` ? AsNumber<`-${_DecPos<Abs>}`>
      : _IncNonneg<N>
    : Unreachable

/**
 * increments nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 * 
 * @since 0.0.2
 */
export type IncNonneg<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? _IncNonneg<N>
      : Unreachable
    : never

/**
 * increments integer `N`
 *
 * validates that `N` is in fact an integer
 * 
 * @since 0.0.2
 */
export type Inc<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? _Inc<N>
      : Unreachable
    : never
