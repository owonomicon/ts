import { And } from "../boolean/and"
import { Not } from "../boolean/not"
import { IsUnion } from "../set-theory/is-union"
import { Extends } from "../type/extends"

/**
 * whether `T` is an instance of a unique symbol.
 * to reinforce the uniqueness of a unique symbol, also asserts that `T` is in fact strictly a unique symbol and is not a union type
 * 
 * @example
 * declare const a: unique symbol
 * declare const b: unique symbol
 * type e0 = IsUniqueSymbol<typeof a>             // true
 * type e1 = IsUniqueSymbol<symbol>               // false
 * type e2 = IsUniqueSymbol<typeof a | typeof b>  // true
 */
export type IsUniqueSymbol<T> =
  And<
    Not<IsUnion<T>>,
    And<
      Extends<T, symbol>,
      Not<Extends<symbol, T>>
    >
  >