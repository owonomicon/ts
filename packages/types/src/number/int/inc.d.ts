import { Unreachable } from "../../_meta/unreachable"
import { AsNumber } from "../../string/as-number"
import { Reverse } from "../../string/reverse"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { ValidateInt, ValidateNonnegInt } from "./_validate"
import { __nomicon_unsafe__PosDec } from "./dec"

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
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__NonnegInc<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<_Inc<Reverse<`${N}`>>>>>

/**
 * increments nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 */
export type NonnegInc<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? __nomicon_unsafe__NonnegInc<N>
      : Unreachable
    : never

/**
 * increments integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
 export type __nomicon_unsafe__Inc<N extends number> =
  `${N}` extends (infer S extends string)
    ? S extends '-1' ? 0
      // `-0` serializes to `"0"` so it properly doesnt get handled here where it'd be passed to `PosDec`
      : S extends `-${infer Abs extends number}` ? AsNumber<`-${__nomicon_unsafe__PosDec<Abs>}`>
      : __nomicon_unsafe__NonnegInc<N>
    : Unreachable

/**
 * increments integer `N`
 * 
 * validates that `N` is in fact an integer
 */
export type Inc<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? __nomicon_unsafe__Inc<N>
      : Unreachable
    : never