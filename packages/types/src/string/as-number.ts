/**
 * converts a number string back into a number.
 * 
 * if the string is not a number string, resolves to `never`.
 * 
 * @warning does not handle numbers outside of `[MIN_INT, MAX_INT]` = `[-(2 ^ 53), 2 ^ 53]` 
 * @warning does not properly handle the string "-0"
 * @warning does not properly handle decimals without a leading and trailing digit (e.g. `".1"`, `"1."`)
 * @warning does not properly handle decimals that can be simplified into whole numbers (e.g. `"1.0"`)
 * @warning does not properly handle exponent number strings (e.g. `"1e2"`)
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = AsNumber<never>                // never
 * type e1 = AsNumber<string>               // never
 * type e2 = AsNumber<''>                   // never
 * type e3 = AsNumber<'0'>                  // 0
 * type e4 = AsNumber<'1'>                  // 1
 * type e5 = AsNumber<'-1'>                 // -1
 * type e6 = AsNumber<'0.1'>                // 0.1
 * type e7 = AsNumber<'9007199254740992'>   // 9007199254740992
 * type e8 = AsNumber<'-9007199254740992'>  // -9007199254740992
 * type e9 = AsNumber<'1_000'>              // never
 * 
 * type w0 = AsNumber<'9007199254740993'>   // number
 * type w2 = AsNumber<'.1'>                 // number
 * type w3 = AsNumber<'1.'>                 // number
 * type w4 = AsNumber<'1.0'>                // number
 * type w5 = AsNumber<'1e2'>                // number
 * ```
 */
export type AsNumber<S extends string> =
  S extends `${infer N extends number}`
    ? N
    : never

