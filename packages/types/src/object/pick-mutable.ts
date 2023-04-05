import { Equals } from "../type"
import { If } from "../boolean"

/**
 * Picks the mutable (i.e. non-readonly) properties of `T`.
 */
export type PickMutable<T> =
  {
    [K in keyof T as
      If<
        Equals<
          { [U in K]: T[K] },
          { -readonly [U in K]: T[K] }
        >,
        K
    >]: T[K]
  }
