import { If } from "../boolean/if"
import { Not } from "../boolean/not"
import { Extends } from "../type/extends"

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
