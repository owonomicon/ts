import { List } from "../list/list"
import { Satisfies } from "../type/satisfies"

/**
 * Type representing a function
 */
export type Function<A extends any = any, R extends unknown = unknown> = // `A` needs to be `any` and not `unknown` to match variadic tuples with leading spreads
  (...args: Satisfies<A, List>) => R