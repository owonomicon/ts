import { Unreachable } from "../../type/unreachable";
import { ValidateInt, ValidateNonnegInt } from "./_validate";
import { Inc, IncNonneg } from "./inc";

/**
 * increments nonnegative integer `N`
 * 
 * validates that `N` is in fact a nonnegative integer
 */
export type IncNonneg_Safe<N extends ValidateNonnegInt<N>> =
  ValidateNonnegInt<N> extends number
    ? N extends (infer N extends number)
      ? IncNonneg<N>
      : Unreachable
    : never


/**
 * increments integer `N`
 *
 * validates that `N` is in fact an integer
 */

export type Inc_Safe<N extends ValidateInt<N>> =
  ValidateInt<N> extends number
    ? N extends (infer N extends number)
      ? Inc<N>
      : Unreachable
    : never
