import { Unreachable } from "../../type/unreachable"
import { DecPos, DecNonneg, Dec } from "./dec"
import { ValidatePosInt, ValidateNonnegInt, ValidateInt } from "./_validate"

/**
 * decrements positive integer `N`
 * 
 * validates that `N` is in fact a positive integer
 */
export type DecPos_Safe<N extends ValidatePosInt<N>> =
  ValidatePosInt<N> extends number
    ? N extends (infer N extends number)
      ? DecPos<N>
      : Unreachable
    : never


/**
 * decrements nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 */
export type DecNonneg_Safe<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? DecNonneg<N>
      : Unreachable
    : never


/**
 * decrements integer `N`
 * 
 * validates that `N` is in fact an integer
 */
export type Dec_Safe<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? Dec<N>
      : Unreachable
    : never