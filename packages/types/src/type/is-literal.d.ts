import { IsLiteralNumber } from "../number/is-literal"
import { IsLiteralString } from "../string/is-literal"

/**
 * whether `T` is a literal type (string or number literal)
 */
export type IsLiteral<T> =
  IsLiteralNumber<T> extends true ? true
  : IsLiteralString<T> extends true ? true
  : false