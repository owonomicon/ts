import { IsNever } from "../any/is-never"
import { Equals } from "../_meta/equals"

/**
 * whether `S` is the empty string `""`.
 * does not consider union types including the empty string to "be" the empty string.
 * 
 * @example
 * type e0 = IsEmpty<never>       // 0
 * type e0 = IsEmpty<''>          // 1
 * type e1 = IsEmpty<' '>         // 0
 * type e2 = IsEmpty<'foo'>       // 0
 * type e3 = IsEmpty<'' | 'foo'>  // 0
 */
export type IsEmpty<S extends string> =
  Equals<S, ''>
