import { IsAny } from "."

/**
 * whether `T` is the `unknown` type
 * 
 * @since 0.0.2
 */
export type IsUnknown<T> = 
  IsAny<T> extends true ? false
  : unknown extends T ? true
  : false
