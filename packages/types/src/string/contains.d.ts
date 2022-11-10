
/**
 * whether string `S` contains substring `Infix`
 * 
 * @example
 * type e0 = Contains<never, never>             // never
 * type e1 = Contains<never, 'foo'>             // 0
 * type e2 = Contains<'foo', never>             // never
 * type e3 = Contains<'foo', 'foobarbaz'>       // 1
 * type e4 = Contains<'bar', 'foobarbaz'>       // 1
 * type e5 = Contains<'baz', 'foobarbaz'>       // 1
 * type e6 = Contains<'qux', 'foobarbaz'>       // 0
 * type e7 = Contains<'foobarbaz', 'foobarbaz'> // 1
 * type e8 = Contains<'foo', string>            // 0
 * type e9 = Contains<string, 'foo'>            // 1
 * type e11 = Contains<`v${number}`, 'v1'>      // 1
 * type e12 = Contains<`v${number}`, 'vfoo'>    // 1
 * 
 * type e13 = Contains<'🔥', '🔥Blazing Fast'>  // 1
 * type e14 = Contains<'\uD83D', '🔥'>          // 1  // "🔥" is made of the code point "\uD83D\uDD25"
 */
export type Contains<Infix extends string, S extends string> =
  S extends `${string}${Infix}${string}` ? 1
  : S extends `${string}${Infix}` ? 1
  : S extends `${Infix}${string}` ? 1
  : 0