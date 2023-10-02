import { If } from "../boolean"
import { IsLiteral } from "."

/**
 * asserts a given string is a string literal
 * 
 * @since 0.0.2
 */
export type Literal<T extends string> =
  If<IsLiteral<T>, T>