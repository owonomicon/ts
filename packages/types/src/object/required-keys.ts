import { If, Not } from "../boolean"
import { Extends } from "../type"

/**
 * gets the required keys of `T`.
 * does not capture index signatures.
 *
 * @example
 * type e0 = RequiredKeys<{}> // never
 * type e1 = RequiredKeys<{ a?: 0 }> // never
 * type e2 = RequiredKeys<{ a?: 0, b: 1 | undefined, c: 2 }> // "b" | "c"
 */

export type RequiredKeys<T> =
  {
    [K in keyof T]-?:
      If<
        Not<Extends<{}, Pick<T, K>>>,
        K
      >
  }[keyof T]
