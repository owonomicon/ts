import { IsNever } from "../any/is-never";
import { And } from "../bool/and";
import { Not } from "../bool/not";

/**
 * whether `A` extends `B`.
 * 
 * 
 * @example
 * type e0 = Exceeds<0, 1> // 0
 * 
 * // nothing can be `never`. use `IsNever` to check if a type is `never`
 * type n0 = Exceeds<never, never> // 0
 * type n1 = Exceeds<string, never> // 0
 * type n2 = Extends<never, string> // 0
 */
export type Extends<A, B> =
  And<
    Not<IsNever<A>>,
    A extends B ? 1 : 0
  >