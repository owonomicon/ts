import { And } from "../bool/and"
import { Not } from "../bool/not"
import { Extends } from "../type/extends"

/**
 * whether `T` is a number literal type
 */
export type IsNumberLiteral<T> =
  And<
    Extends<T, number>,
    Not<Extends<number, T>>
  >