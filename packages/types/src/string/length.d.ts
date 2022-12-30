import { If } from "../bool/if"
import { Length as ListLength } from "../list/length"
import { IsLiteral } from "./is-literal"

/**
 * gets the length of a string literal
 */
type _Length<S extends string, Acc extends never[] = []> =
  S extends '' ? ListLength<Acc>
  : S extends `${infer H}${infer T}`
    ? _Length<T, [...Acc, never]> // since we assume `S` is nonvariadic this should be accurate
  : number

/**
 * gets the length of a string as the number of characters.
 * @warning unicode symbols may count as 2 characters, as code points are not distinguished.
 * 
 * @example
 * type e0 = Length<string>             // number
 * type e1 = Length<`${number}`>        // number
 * type e2 = Length<'foo'>              // 3
 * type e3 = Length<`foo${string}`>     // number
 * type e4 = Length<`${string}foo`>     // number
 * type e5 = Length<`foo${string}bar`>  // number
 * 
 * // string consisting of 512 "0" characters
 * type t6 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
 * type e6 = Length<t6>                 // 512
 * 
 * type w0 = Length<'✅'> // 1
 * type s1 = Length<'🔥'> // 2
 * 
 */
type Length<S extends string> =
  If<
    IsLiteral<S>,
    _Length<S>,
    number
  >