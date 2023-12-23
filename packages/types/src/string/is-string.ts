
/**
 * whether `T` is a string type
 * 
 * @since 0.0.9
 */
export type IsString<T> =
  T extends string
    ? true
    : false