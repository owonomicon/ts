/**
 * converts a string to uppercase.
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Uppercase<never>       // never
 * type e1 = Uppercase<''>          // ""
 * type e2 = Uppercase<'foo'>       // "FOO"
 * type e3 = Uppercase<'Foo'>       // "FOO"
 * type e4 = Uppercase<'FOO'>       // "FOO"
 * type e5 = Uppercase<'fOO'>       // "FOO"
 * type e6 = Uppercase<string>      // Uppercase<string>
 * type e7 = Uppercase<`${number}`> // `${Uppercase<`${number}`}`
 * 
 * type e8 = Uppercase<'🔥'>  // "🔥"
 * 
 * @see https://github.com/microsoft/TypeScript/pull/40580
 * @see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types
 */
export type Uppercase<S extends string> = intrinsic

/**
 * converts a string to lowercase.
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Lowercase<never>       // never
 * type e1 = Lowercase<''>          // ""
 * type e2 = Lowercase<'foo'>       // "foo"
 * type e3 = Lowercase<'Foo'>       // "foo"
 * type e4 = Lowercase<'FOO'>       // "foo"
 * type e5 = Lowercase<'fOO'>       // "foo"
 * type e6 = Lowercase<string>      // Lowercase<string>
 * type e7 = Lowercase<`${number}`> // `${Lowercase<`${number}`}`
 * 
 * type e8 = Lowercase<'🔥'>  // "🔥"
 * 
 * @see https://github.com/microsoft/TypeScript/pull/40580
 * @see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types
 * 
 */
export type Lowercase<S extends string> = intrinsic

/**
 * capitalizes a string
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Capitalize<never>       // never
 * type e1 = Capitalize<''>          // ""
 * type e2 = Capitalize<'foo'>       // "Foo"
 * type e3 = Capitalize<'Foo'>       // "Foo"
 * type e4 = Capitalize<'FOO'>       // "FOO"
 * type e5 = Capitalize<'fOO'>       // "FOO"
 * type e6 = Capitalize<string>      // Capitalize<string>
 * type e7 = Capitalize<`${number}`> // `${Capitalize<`${number}`}`
 * 
 * type e8 = Capitalize<'🔥'>  // "🔥"
 * 
 * @see https://github.com/microsoft/TypeScript/pull/40580
 * @see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types
 */
export type Capitalize<S extends string> = intrinsic

/**
 * uncapitalizes a string.
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Uncapitalize<never>       // never
 * type e1 = Uncapitalize<''>          // ""
 * type e2 = Uncapitalize<'foo'>       // "foo"
 * type e3 = Uncapitalize<'Foo'>       // "foo"
 * type e4 = Uncapitalize<'FOO'>       // "fOO"
 * type e5 = Uncapitalize<'fOO'>       // "fOO"
 * type e6 = Uncapitalize<string>      // Uncapitalize<string>
 * type e7 = Uncapitalize<`${number}`> // `${Uncapitalize<`${number}`}`
 * 
 * type e8 = Uncapitalize<'🔥'>  // "🔥"
 * 
 * @see https://github.com/microsoft/TypeScript/pull/40580
 * @see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types
 */
export type Uncapitalize<S extends string> = intrinsic