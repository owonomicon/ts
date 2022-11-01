import { If } from "../bool/if";
import { IsStringLiteral } from "./is-string-literal";

/**
 * asserts a given string is a string literal
 */
export type StringLiteral<T extends string> =
  If<IsStringLiteral<T>, T>