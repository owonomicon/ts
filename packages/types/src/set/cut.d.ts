/**
 * excludes `T` from intersection type `I`.
 * if `T` is not part of `I`, resolves to `F` (default `I`).
 * @warn `T` must exactly match `I` for this type to work properly, i.e. `I = T & whatever`
 * @example
 * type e0 = Cut<boolean & {}, {}> // boolean
 * type e1 = Cut<{ a: 0 } & { b: 1, c: 2 }, { b: 1, c: 2 }> // { a: 0 }
 * type e2 = Cut<{ a: 0, b: 1, c: 2 }, { b: 1, c: 2 }, 'failed'> // 'failed' // `T` is not an intersection type so it doesn't match 
 */
export type Cut<I, T, F = I> =
  I extends (infer U & T)
    ? U
    : F