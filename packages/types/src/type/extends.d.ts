import { IsNever } from "../type/is-never";
import { If } from "../bool/if";

/**
 * whether `A` extends `B`.
 * returns false if  `A` or `B` are never.
 * 
 * @example
 * type e0 = Extends<0, 1> // false
 * 
 * // nothing can be `never`. use `IsNever` to check if a type is `never`
 * type e1 = Extends<never, never> // false
 * type e2 = Extends<string, never> // false
 * type e3 = Extends<never, string> // false
 */
export type Extends<A, B> =
  If<
    IsNever<A>,
    false,
    A extends B
      ? true
      : false
  >