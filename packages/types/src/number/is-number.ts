
/**
 * whether `T` is a number type
 * 
 * @since 0.0.9
 */
export type IsNumber<T> =
  T extends number
    ? true
    : false