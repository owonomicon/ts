/**
 * whether `S` is a numeric string.
 * if `S` is a union type, returns `1` only if all members are numeric
 * 
 * @example
 * type e0 = IsNumeric<never>       // 1
 * type e1 = IsNumeric<''>          // 0
 * type e2 = IsNumeric<'0'>         // 1
 * type e3 = IsNumeric<'NaN'>       // 0
 * type e4 = IsNumeric<'-9.8'>      // 1
 * type e5 = IsNumeric<'foo'>       // 0
 * type e6 = IsNumeric<'0' | 'foo'> // 0
 * type e7 = IsNumeric<'0' | '1'>   // 1
 */
export type IsNumeric<S extends string> =
  [S] extends [`${number}`]
    ? 1
    : 0