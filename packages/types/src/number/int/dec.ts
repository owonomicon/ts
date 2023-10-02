import { AsNumber, Reverse } from "../../string"
import { Unreachable } from "../../type"
import { StripLeadingZeros } from "../string"
import { ValidatePosInt, ValidateNonnegInt, ValidateInt } from "./_validate"
import { _Inc } from "."

type SubtractionDigitMap =
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]

/**
 * "decrements" a positive integer in reverse serialized form `S`
 * e.g. `__Dec<"01"> = "90"` since `"01"` represents `10` and `"09"` represents `9`
 */
type __Dec<S extends string> =
  S extends `${infer D extends number}${infer T}`
    ? D extends 0
      ? `9${__Dec<T>}`
      : `${SubtractionDigitMap[D]}${T}`
    : Unreachable

/**
 * decrements positive integer `N`
 * 
 * @warning you probably want to use `DecPos` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _DecPos<N extends number> =
  AsNumber<StripLeadingZeros<Reverse<__Dec<Reverse<`${N}`>>>>>

/**
 * decrements nonnegative integer `N`
 * 
 * @warning you probably want to use `DecNonneg` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _DecNonneg<N extends number> =
  N extends 0
    ? -1
    : _DecPos<N>  

/**
 * decrements integer `N`
 * 
 * @warning you probably want to use `Dec` instead. this type does not enforce type constraints past `number`.
 * 
 * @since 0.0.2
 */
export type _Dec<N extends number> =
  `${N}` extends `-${infer Abs extends number}` // `-0` serializes to `"0"` so -0 will still be handled by `NonnegDec`
    ? AsNumber<`-${_Inc<Abs>}`>
    : _DecNonneg<N>

/**
 * decrements positive integer `N`
 * 
 * validates that `N` is in fact a positive integer
 * 
 * @since 0.0.2
 */
export type DecPos<N extends ValidatePosInt<N>> =
  ValidatePosInt<N> extends number
    ? N extends (infer N extends number)
      ? _DecPos<N>
      : Unreachable
    : never

/**
 * decrements nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 * 
 * @since 0.0.2
 */
export type DecNonneg<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? _DecNonneg<N>
      : Unreachable
    : never


/**
 * decrements integer `N`
 * 
 * validates that `N` is in fact an integer
 * 
 * @since 0.0.2
 */
export type Dec<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? _Dec<N>
      : Unreachable
    : never