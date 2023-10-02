/**
 * whether `T` is the `any` type
 * 
 * @since 0.0.2
 */
export type IsAny<T> =
  0 extends (1 & T) // this is true only when `T` is any
    ? true
    : false
