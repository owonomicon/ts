import { If } from "../bool/if"
import { Not } from "../bool/not"
import { Or } from "../bool/or"
import { Contains as ListContains } from "../list/contains"
import { List } from "../list/list"
import { AsTuple } from "../set/as-tuple"
import { Equals } from "../_meta/equals"
import { Satisfies } from "../_meta/satisfies"

/**
 * checks whether `S` is a string literal (i.e. must have finite length and is well-defined).
 * 
 * @example
 * type e0 = IsLiteral<never>                        // never
 * type e1 = IsLiteral<''>                           // true
 * type e2 = IsLiteral<'foo'>                        // true
 * type e3 = IsLiteral<string>                       // false
 * type e4 = IsLiteral<`${number}`>                  // false
 * type e5 = IsLiteral<`${number}foo`>               // false
 * type e6 = IsLiteral<`foo${number}`>               // false
 * type e7 = IsLiteral<`foo${number}bar`>            // false
 * type e8 = IsLiteral<`${number | bigint}`>         // false
 * type e9 = IsLiteral<`foo${number | bigint}`>      // false  
 * type e10 = IsLiteral<`${number | bigint}bar`>     // false
 * type e11 = IsLiteral<`foo${number | bigint}bar`>  // false
 * 
 * // below is a string of 512 "0" characters
 * type t12 = `00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`
 * type e12 = IsLiteral<t12>                         // true
 * 
 * @todo revisit this, seems kinda scuffed / possibly not very performant
 */
export type IsLiteral<S extends string> =
  S extends `${infer H}${infer T}`
    ? AsTuple<H> extends infer L
      ? Or<
          ListContains<Satisfies<L, List>, string, 'equals'>,
          Or<
            ListContains<Satisfies<L, List>, `${number}`, 'equals'>,
            ListContains<Satisfies<L, List>, `${bigint}`, 'equals'>
          >
        > extends true
          ? false
          : IsLiteral<T>
      : false // unreachable
    : Not<Equals<S, string>> // only the plain `string` type or empty string "" should be able to reach here
