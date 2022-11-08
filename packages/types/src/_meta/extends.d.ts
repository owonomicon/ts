import { IsNever } from "../any/is-never";
import { If } from "../bool/if";

/**
 * whether `A` extends `B`.
 * if `A` or `B` are never, resolves to `0`.
 * 
 * @example
 * type e0 = Extends<0, 1> // 0
 * 
 * // nothing can be `never`. use `IsNever` to check if a type is `never`
 * type e1 = Extends<never, never> // 0
 * type e2 = Extends<string, never> // 0
 * type e3 = Extends<never, string> // 0
 */
export type Extends<A, B> =
  If<
    IsNever<A>,
    0,
    A extends B ? 1 : 0
  >