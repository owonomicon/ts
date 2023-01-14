import { Unreachable } from "../type/unreachable"
import { Required } from "./required"

/**
 * gets the optional keys of `T`
 * 
 * @remarks
 * does not capture index signatures.
 *
 * @remarks
 * may fail to capture keys that are also assignable to an index signature
 * 
 * @example
 * type e0 = OptionalKeys<{}> // never
 * type e1 = OptionalKeys<{ a?: 0 }> // "a"
 * type e2 = OptionalKeys<{ a?: 0, b: 1 | undefined, c?: 2 }> // "a" | "c"
 * 
 * type w0 = OptionalKeys<{ [x: number]: string, 0?: '' }>  // never // should've captured 0!!
 */

export type OptionalKeys<T> =
  Required<T> extends (infer U extends Record<keyof T, any>)
    ? { [K in keyof T]-?: T[K] extends U[K] ? never : K }[keyof T]
    : Unreachable
