import { And } from "../bool/and";
import { Not } from "../bool/not";
import { IsUnion } from "../set/is-union";
import { Extends } from "../_meta/extends";

/**
 * whether `T` is an instance of a unique symbol.
 * to reinforce the uniqueness of a unique symbol, also asserts that `T` is in fact strictly a unique symbol and is not a union type
 * 
 * @example
 * declare const a: unique symbol
 * declare const b: unique symbol
 * type e0 = IsUniqueSymbol<typeof a>             // 1
 * type e1 = IsUniqueSymbol<symbol>               // 0
 * type e2 = IsUniqueSymbol<typeof a | typeof b>  // 1
 */
export type IsUniqueSymbol<T> =
  And<
    Not<IsUnion<T>>,
    And<
      Extends<T, symbol>,
      Not<Extends<symbol, T>>
    >
  >