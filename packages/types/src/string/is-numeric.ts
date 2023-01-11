/**
 * whether `S` is a numeric string.
 * if `S` is a union type, returns `1` only if all members are numeric
 * 
 * @example
 * type e0 = IsNumeric<never>       // true
 * type e1 = IsNumeric<''>          // false
 * type e2 = IsNumeric<'0'>         // true
 * type e3 = IsNumeric<'NaN'>       // false
 * type e4 = IsNumeric<'-9.8'>      // true
 * type e5 = IsNumeric<'foo'>       // false
 * type e6 = IsNumeric<'0' | 'foo'> // false
 * type e7 = IsNumeric<'0' | '1'>   // true
 */
export type IsNumeric<S extends string> =
  [S] extends [`${number}`]
    ? true
    : false

export type IsNumericString<T> =
  T extends string
    ? IsNumeric<T>
    : false