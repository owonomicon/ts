
type _Split<S extends string, P extends string, Acc extends string[] = []> =
  S extends `${infer H}${P}${infer T}` ? _Split<T, P, [...Acc, H]>
  : P extends ""
    // if we've reached here then `S` is necessarily the empty string,
    // which we dont want to append to the list
    ? Acc
    : [...Acc, S]

/**
 * splits a string by pattern `P`.
 * splits greedily from start to end.
 * 
 * @undefined_behavior `S` or `P` is a template literal
 * 
 * @since 0.0.6
 * 
 * 
 * @example
 * ```ts
 * type ub0 = Split<`a${string}b${string}c`>, 'b'>    // [`a${string}`, `${string}c`]
 * type ub1 = Split<`a${string}b${string}c`>, string> // ['a', 'b', 'c']
 * ```
 */
export type Split<S extends string, P extends string = ''> =
  S extends ''
    ? [S]
    : _Split<S, P>
