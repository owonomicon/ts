import { IsAny } from "./is-any";

/**
 * whether `T` is the `unknown` type
 */
export type IsUnknown<T> = 
  IsAny<T> extends 1 ? 0
  : unknown extends T ? 1
  : 0
