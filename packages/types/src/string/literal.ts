import { If } from "../boolean/if"
import { IsLiteral } from "./is-literal"

/**
 * asserts a given string is a string literal
 */
export type Literal<T extends string> =
  If<IsLiteral<T>, T>