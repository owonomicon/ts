/**
 * @since 0.0.2
 */
export type IsChar<S extends string> =
  S extends `${string}${infer T}`
    ? T extends ''
      ? true
      : false
    : false

/**
 * @since 0.0.2
 */
export type IsCharString<T> =
  T extends string
    ? IsChar<T>
    : false