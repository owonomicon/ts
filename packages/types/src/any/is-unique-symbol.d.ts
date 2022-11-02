import { And } from "../bool/and";
import { Not } from "../bool/not";
import { IsUnion } from "../set/is-union";
import { Extends } from "../_meta/extends";

/**
 * whether `T` is an instance of a unique symbol.
 * to reinforce the uniqueness of a unique symbol, also asserts that `T` is in fact strictly a unique symbol and is not a union type
 */
export type IsUniqueSymbol<T> =
  And<
    Not<IsUnion<T>>,
    And<
      Extends<T, symbol>,
      Not<Extends<symbol, T>>
    >
  >