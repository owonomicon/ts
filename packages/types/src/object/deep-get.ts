import { IsEmpty, List } from "../list"
import { Key } from "."

/**
 * gets the value from walking along `T` via keys `Keys`.
 * 
 * if a key does not exist, returns `never`
 * 
 * @since 0.0.9
 */
export type DeepGet<T, Keys extends List<Key>> =
  IsEmpty<Keys> extends true ? T
  : Keys extends [infer H extends Key, ...infer Tail extends List<Key>]
    ? H extends keyof T
      ? DeepGet<T[H], Tail>
      : never
  : never