import { IsNever } from "../any/is-never"
import { Equals } from "../_meta/equals"

/**
 * whether `S` is the empty string `""`.
 * does not consider union types including the empty string to "be" the empty string.
 * 
 * @example
 * type e0 = IsEmpty<never>       // false
 * type e0 = IsEmpty<''>          // true
 * type e1 = IsEmpty<' '>         // false
 * type e2 = IsEmpty<'foo'>       // false
 * type e3 = IsEmpty<'' | 'foo'>  // false
 */
export type IsEmpty<S extends string> =
  Equals<S, ''>
