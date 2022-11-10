import { Extends } from "../_meta/extends";
import { Capitalize, Lowercase, Uncapitalize, Uppercase } from "./case";

/**
 * checks whether string `S` is uppercase
 * 
 * @example
 * type e0 = IsUppercase<never>       // 0
 * type e1 = IsUppercase<''>          // 1
 * type e2 = IsUppercase<'foo'>       // 0
 * type e3 = IsUppercase<'Foo'>       // 0
 * type e4 = IsUppercase<'FOO'>       // 1
 * type e5 = IsUppercase<'fOO'>       // 0
 * type e6 = IsUppercase<string>      // string extends Uppercase<string> ? 1 : 0
 * type e7 = IsUppercase<`${number}`> //  `${number}` extends `${Uppercase<`${number}`>}` ? 1 : 0
 * 
 * type e8 = IsUppercase<'🔥'>    // 1
 */
export type IsUppercase<S extends string> =
  Extends<S, Uppercase<S>>

/**
 * checks whether string `S` is lowercase
 * 
 * @example
 * type e0 = IsLowercase<never>       // 0
 * type e1 = IsLowercase<''>          // 1
 * type e2 = IsLowercase<'foo'>       // 1
 * type e3 = IsLowercase<'Foo'>       // 0
 * type e4 = IsLowercase<'FOO'>       // 0
 * type e5 = IsLowercase<'fOO'>       // 0
 * type e6 = IsLowercase<string>      // string extends Lowercase<string> ? 1 : 0
 * type e7 = IsLowercase<`${number}`> //  `${number}` extends `${Lowercase<`${number}`>}` ? 1 : 0
 * 
 * type e8 = IsLowercase<'🔥'>    // 1
 */
export type IsLowercase<S extends string> =
  Extends<S, Lowercase<S>>

/**
 * checks whether string `S` is capitalized
 * 
 * @example
 * type e0 = IsCapitalized<never>       // 0
 * type e1 = IsCapitalized<''>          // 1
 * type e2 = IsCapitalized<'foo'>       // 0
 * type e3 = IsCapitalized<'Foo'>       // 1
 * type e4 = IsCapitalized<'FOO'>       // 1
 * type e5 = IsCapitalized<'fOO'>       // 0
 * type e6 = IsCapitalized<string>      // string extends Capitalize<string> ? 1 : 0
 * type e7 = IsCapitalized<`${number}`> //  `${number}` extends `${Capitalize<`${number}`>}` ? 1 : 0
 * 
 * type e8 = IsCapitalized<'🔥'>    // 1
 */
export type IsCapitalized<S extends string> =
  Extends<S, Capitalize<S>>

/**
 * checks whether string `S` is uncapitalized
 * 
 * @example
 * type e0 = IsUncapitalized<never>       // 0
 * type e1 = IsUncapitalized<''>          // 1
 * type e2 = IsUncapitalized<'foo'>       // 1
 * type e3 = IsUncapitalized<'Foo'>       // 0
 * type e4 = IsUncapitalized<'FOO'>       // 0
 * type e5 = IsUncapitalized<'fOO'>       // 1
 * type e6 = IsUncapitalized<string>      // string extends Uncapitalize<string> ? 1 : 0
 * type e7 = IsUncapitalized<`${number}`> //  `${number}` extends `${Uncapitalize<`${number}`>}` ? 1 : 0
 * 
 * type e8 = IsUncapitalized<'🔥'>    // 1
 */
export type IsUncapitalized<S extends string> =
  Extends<S, Uncapitalize<S>>