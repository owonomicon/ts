import { If, Not } from "../boolean"
import { Equals } from "../type"

/**
 * gets the readonly keys of `T`
 * does not capture index signatures.
 * 
 * @since 0.0.2
 *
 * @example
 * type e0 = ReadonlyKeys<{}> // never
 * type e1 = ReadonlyKeys<{ readonly a: 0 }> // "a"
 * type e2 = ReadonlyKeys<{ readonly a: 0, b?: 1 | undefined, readonly c?: 2 }> // "a" | "c"
 */

export type ReadonlyKeys<T> =
  {
    [K in keyof T]-?:
      If<
        Not<Equals<
          { [P in K]: T[P] },
          { -readonly [P in K]: T[P] }
        >>,
        K
      >
  }[keyof T]
