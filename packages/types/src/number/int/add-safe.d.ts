import { Unreachable } from "../../type/unreachable"
import { ValidateInt, ValidateNonnegInt } from "./_validate"
import { Add, AddNonneg } from "./add"

/**
 * adds nonnegative integer `N2` to nonnegative integer `N1`
 * 
 * validates that `N1 and `N2` are in fact nonnegative integers
 */
export type AddNonneg_Safe<N1 extends ValidateNonnegInt<N1, 'N1'>, N2 extends ValidateNonnegInt<N2, 'N2'>> =
  [ValidateNonnegInt<N1>, ValidateNonnegInt<N2>] extends [number, number]
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? AddNonneg<N1, N2>
      : Unreachable
    : never

/**
 * adds integer `N2` to integer `N1`
 *
 * validates that `N1 and `N2` are in fact integers
 */

export type Add_Safe<N1 extends ValidateInt<N1, 'N1'>, N2 extends ValidateInt<N2, 'N2'>> =
  [ValidateInt<N1>, ValidateInt<N2>] extends [number, number] 
    ? [N1, N2] extends [infer N1 extends number, infer N2 extends number]
      ? Add<N1, N2>
      : Unreachable
    : never
