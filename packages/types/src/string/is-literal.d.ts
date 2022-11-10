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
 * type e1 = IsLiteral<''>                           // 1
 * type e2 = IsLiteral<'foo'>                        // 1
 * type e3 = IsLiteral<string>                       // 0
 * type e4 = IsLiteral<`${number}`>                  // 0
 * type e5 = IsLiteral<`${number}foo`>               // 0 
 * type e6 = IsLiteral<`foo${number}`>               // 0
 * type e7 = IsLiteral<`foo${number}bar`>            // 0
 * type e8 = IsLiteral<`${number | bigint}`>         // 0
 * type e9 = IsLiteral<`foo${number | bigint}`>      // 0  
 * type e10 = IsLiteral<`${number | bigint}bar`>     // 0
 * type e11 = IsLiteral<`foo${number | bigint}bar`>  // 0
 * 
 * // below is a string of 512 "0" characters
 * type t12 = `00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`
 * type e12 = IsLiteral<t12>                         // 1
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
        > extends 1
          ? 0
          : IsLiteral<T>
      : 0 // unreachable
    : Not<Equals<S, string>> // only the plain `string` type or empty string "" should be able to reach here
