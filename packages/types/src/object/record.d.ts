import { Key } from "./key";

/**
 * object with properties `K` of type `V`.
 * if `K` is a union, exhaustively matches (i.e. requires all `T` in `K` to be keys)
 */
export type Record<K extends Key, V> =
  { [P in K]: V }
