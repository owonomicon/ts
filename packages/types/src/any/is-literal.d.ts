import { IsNumberLiteral } from "../number/is-number-literal";
import { IsStringLiteral } from "../string/is-string-literal";
import { Or } from "../bool/or";

/**
 * whether `T` is a literal type (string or number literal)
 */
export type IsLiteral<T> =
  Or<
    IsStringLiteral<T>,
    IsNumberLiteral<T>
  >