import { IsNumberLiteral } from "../number/is-number-literal"
import { IsLiteral as IsStringLiteral } from "../string/is-literal"

/**
 * whether `T` is a literal type (string or number literal)
 */
export type IsLiteral<T> =
  IsNumberLiteral<T> extends true ? true
  : IsStringLiteral<T> extends true ? true
  : false