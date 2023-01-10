/**
 * whether `N` is a number literal type
 */
export type IsLiteral<N extends number> =
  number extends N
    ? false
    : true

export type IsLiteralNumber<T> =
  T extends number
    ? IsLiteral<T>
    : false