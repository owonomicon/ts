import { Not, Or } from "../boolean"
import { Extends } from "../type"

/**
 * checks whether `S` is a string literal (i.e. well-defined string with finite length).
 * 
 * @warning check is O(n) wrt string length
 * 
 * @since 0.0.2
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
  S extends string
    ? S extends `${infer H}${infer T}`
        ? Or<
            Extends<string, H>,
            Or<
              Extends<`${number}`, H>,
              Extends<`${bigint}`, H>
            >
          > extends true
              ? false
              : IsLiteral<T>
        : Not<Extends<string, S>> // only the plain `string` type or empty string "" should be able to reach here
    : false

/**
 * @since 0.0.2
 */
export type IsLiteralString<T> =
  T extends string
    ? IsLiteral<T>
    : false
