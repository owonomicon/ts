import { If } from "../bool/if";
import { Not } from "../bool/not";
import { Equals } from "../type/equals";

/**
 * gets the readonly keys of `T`
 * does not capture index signatures.
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
