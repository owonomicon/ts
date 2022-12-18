import { Unreachable } from "../../type/unreachable";
import { ValidateInt, ValidateNonnegInt } from "./_validate";
import { Sub, SubNonneg } from "./sub";

/**
 * subtracts nonnegative integer `N2` from nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 */
export type SubNonneg_Safe<N1 extends ValidateNonnegInt<N1>, N2 extends ValidateNonnegInt<N2>> =
  [N1, N2] extends [infer N1 extends number, infer N2 extends number]
    ? SubNonneg<N1, N2>
    : Unreachable

/**
 * subtracts integer `N2` from integer `N1`
 *
 * validates that `N1 and `N2` are in fact integers
 */

export type Sub_Safe<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  ValidateInt<N1> extends number
    ? ValidateInt<N2> extends number
      ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
        ? Sub<N1, N2>
        : Unreachable
      : never
    : never