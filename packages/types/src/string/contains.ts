
/**
 * whether string `S` contains substring `Infix`
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Contains<never, never>             // never
 * type e1 = Contains<never, 'foo'>             // false
 * type e2 = Contains<'foo', never>             // never
 * type e3 = Contains<'foo', 'foobarbaz'>       // true
 * type e4 = Contains<'bar', 'foobarbaz'>       // true
 * type e5 = Contains<'baz', 'foobarbaz'>       // true
 * type e6 = Contains<'qux', 'foobarbaz'>       // false
 * type e7 = Contains<'foobarbaz', 'foobarbaz'> // true
 * type e8 = Contains<'foo', string>            // false
 * type e9 = Contains<string, 'foo'>            // true
 * type e11 = Contains<`v${number}`, 'v1'>      // true
 * type e12 = Contains<`v${number}`, 'vfoo'>    // true
 * 
 * type e13 = Contains<'🔥', '🔥Blazing Fast'>  // true
 * type e14 = Contains<'\uD83D', '🔥'>          // true  // "🔥" is made of the code point "\uD83D\uDD25"
 */
export type Contains<Infix extends string, S extends string> =
  S extends `${string}${Infix}${string}` ? true
  : S extends `${string}${Infix}` ? true
  : S extends `${Infix}${string}` ? true
  : false