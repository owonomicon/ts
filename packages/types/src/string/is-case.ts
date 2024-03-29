import { Extends } from "../type"
import { Capitalize, Lowercase, Uncapitalize, Uppercase } from "."

/**
 * checks whether string `S` is uppercase
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = IsUppercase<never>       // false
 * type e1 = IsUppercase<''>          // true
 * type e2 = IsUppercase<'foo'>       // false
 * type e3 = IsUppercase<'Foo'>       // false
 * type e4 = IsUppercase<'FOO'>       // true
 * type e5 = IsUppercase<'fOO'>       // false
 * type e6 = IsUppercase<string>      // string extends Uppercase<string> ? true : false
 * type e7 = IsUppercase<`${number}`> //  `${number}` extends `${Uppercase<`${number}`>}` ? true : false
 * 
 * type e8 = IsUppercase<'🔥'>    // true
 */
export type IsUppercase<S extends string> =
  Extends<S, Uppercase<S>>

/**
 * @since 0.0.2
 */
export type IsUppercaseString<T> =
  T extends string
    ? IsUppercase<T>
    : false

/**
 * checks whether string `S` is lowercase
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = IsLowercase<never>       // false
 * type e1 = IsLowercase<''>          // true
 * type e2 = IsLowercase<'foo'>       // true
 * type e3 = IsLowercase<'Foo'>       // false
 * type e4 = IsLowercase<'FOO'>       // false
 * type e5 = IsLowercase<'fOO'>       // false
 * type e6 = IsLowercase<string>      // string extends Lowercase<string> ? true : false
 * type e7 = IsLowercase<`${number}`> //  `${number}` extends `${Lowercase<`${number}`>}` ? true : false
 * 
 * type e8 = IsLowercase<'🔥'>    // true
 */
export type IsLowercase<S extends string> =
  Extends<S, Lowercase<S>>

/**
 * @since 0.0.2
 */
export type IsLowercaseString<T> =
  T extends string
    ? IsLowercase<T>
    : false

/**
 * checks whether string `S` is capitalized
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = IsCapitalized<never>       // false
 * type e1 = IsCapitalized<''>          // true
 * type e2 = IsCapitalized<'foo'>       // false
 * type e3 = IsCapitalized<'Foo'>       // true
 * type e4 = IsCapitalized<'FOO'>       // true
 * type e5 = IsCapitalized<'fOO'>       // false
 * type e6 = IsCapitalized<string>      // string extends Capitalize<string> ? true : false
 * type e7 = IsCapitalized<`${number}`> //  `${number}` extends `${Capitalize<`${number}`>}` ? true : false
 * 
 * type e8 = IsCapitalized<'🔥'>    // true
 */
export type IsCapitalized<S extends string> =
  Extends<S, Capitalize<S>>

/**
 * @since 0.0.2
 */
export type IsCapitalizedString<T> =
  T extends string
    ? IsCapitalized<T>
    : false

/**
 * checks whether string `S` is uncapitalized
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = IsUncapitalized<never>       // false
 * type e1 = IsUncapitalized<''>          // true
 * type e2 = IsUncapitalized<'foo'>       // true
 * type e3 = IsUncapitalized<'Foo'>       // false
 * type e4 = IsUncapitalized<'FOO'>       // false
 * type e5 = IsUncapitalized<'fOO'>       // true
 * type e6 = IsUncapitalized<string>      // string extends Uncapitalize<string> ? true : false
 * type e7 = IsUncapitalized<`${number}`> //  `${number}` extends `${Uncapitalize<`${number}`>}` ? true : false
 * 
 * type e8 = IsUncapitalized<'🔥'>    // true
 */
export type IsUncapitalized<S extends string> =
  Extends<S, Uncapitalize<S>>

/**
 * @since 0.0.2
 */
export type IsUncapitalizedString<T> =
  T extends string
    ? IsUncapitalized<T>
    : false