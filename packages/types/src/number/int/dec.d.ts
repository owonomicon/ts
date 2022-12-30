import { AsNumber } from "../../string/as-number"
import { Reverse } from "../../string/reverse"
import { StripLeadingZeros } from "../string/strip-leading-zeros"
import { Unreachable } from "../../type/unreachable"
import { Inc } from "./inc"

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
export type DecPos<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<_Dec<Reverse<`${N}`>>>>>

/**
 * decrements nonnegative integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type DecNonneg<N extends number> =
  N extends 0
    ? -1
    : DecPos<N>  

/**
 * decrements integer `N`
 * 
 * the typesafe version of this method (i.e. without the `__nomicon_unsafe__` prefix) should be preferred over this method in every case unless you intend to use it in another type and have ensured that the type parameter(s) hold
 */
export type Dec<N extends number> =
  `${N}` extends `-${infer Abs extends number}` // `-0` serializes to `"0"` so -0 will still be handled by `NonnegDec`
    ? `-${Inc<Abs>}`
    : DecNonneg<N>
