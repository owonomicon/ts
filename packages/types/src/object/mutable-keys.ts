import { Exclude } from "../set-theory/exclude"
import { ReadonlyKeys } from "./readonly-keys"

/**
 * gets the mutable keys of `T`
 * does not capture index signatures.
 * 
 * @example
 * type e0 = MutableKeys<{}> // never
 * type e1 = MutableKeys<{ a: 0 }> // "a"
 * type e2 = MutableKeys<{ a?: 0, b: 1 | undefined, readonly c: 2 }> // "a" | "b"
 */
export type MutableKeys<T> =
  Exclude<keyof T, ReadonlyKeys<T>>