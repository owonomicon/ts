import { IsAny } from "./is-any"

/**
 * whether `T` is the `unknown` type
 */
export type IsUnknown<T> = 
  IsAny<T> extends true ? false
  : unknown extends T ? true
  : false
