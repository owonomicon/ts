import { Or } from "../bool/or"
import { IsNumberLiteral } from "../number/is-number-literal"
import { IsLiteral as IsStringLiteral } from "../string/is-literal"

/**
 * whether `T` is a literal type (string or number literal)
 */
export type IsLiteral<T> =
  Or<
    T extends string
      ? IsStringLiteral<T>
      : false,
    IsNumberLiteral<T>
  >