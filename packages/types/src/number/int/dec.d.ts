import { Unreachable } from "../../_meta/unreachable"
import { AsNumber } from "../../string/as-number"
import { Reverse } from "../../string/reverse"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { ValidateInt, ValidateNonnegInt, ValidatePosInt } from "./_validate"
import { __nomicon_unsafe__Inc } from "./inc"

type SubtractionDigitMap =
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]

/**
 * "decrements" a positive integer in reverse serialized form `S`
 * e.g. `_Dec<"01"> = "90"` since `"01"` represents `10` and `"09"` represents `9`
 */
type _Dec<S extends string> =
  S extends `${infer D extends number}${infer T}`
    ? D extends 0
      ? `9${_Dec<T>}`
      : `${SubtractionDigitMap[D]}${T}`
    : Unreachable

/**
 * decrements positive integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__PosDec<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<_Dec<Reverse<`${N}`>>>>>

/**
 * decrements positive integer `N`
 * 
 * validates that `N` is in fact a positive integer
 */
export type PosDec<N extends ValidatePosInt<N>> =
  ValidatePosInt<N> extends number
    ? N extends (infer N extends number)
      ? __nomicon_unsafe__PosDec<N>
      : Unreachable
    : never

/**
 * decrements nonnegative integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__NonnegDec<N extends number> =
  N extends 0
    ? -1
    : __nomicon_unsafe__PosDec<N>  

/**
 * decrements nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 */
export type NonnegDec<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? __nomicon_unsafe__NonnegDec<N>
      : Unreachable
    : never

/**
 * decrements integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type __nomicon_unsafe__Dec<N extends number> =
  `${N}` extends `-${infer Abs extends number}` // `-0` serializes to `"0"` so -0 will still be handled by `NonnegDec`
    ? `-${__nomicon_unsafe__Inc<Abs>}`
    : NonnegDec<N>

/**
 * decrements integer `N`
 * 
 * validates that `N` is in fact an integer
 */
export type Dec<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? __nomicon_unsafe__Dec<N>
      : Unreachable
    : never