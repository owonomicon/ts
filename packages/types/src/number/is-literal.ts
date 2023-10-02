/**
 * whether `N` is a number literal type
 * 
 * @since 0.0.2
 */
export type IsLiteral<N extends number> =
  number extends N
    ? false
    : true

/**
 * @since 0.0.2
 */
export type IsLiteralNumber<T> =
  T extends number
    ? IsLiteral<T>
    : false