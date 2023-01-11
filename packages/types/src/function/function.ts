import { List } from "../list/list"
import { Satisfies } from "../type/satisfies"

/**
 * Type representing a function
 */
export type Function<
  // `A` has to default to `never` for `extends Function` to work fine
  A extends List = never,
  R extends unknown = unknown
> = 
  (...args: Satisfies<A, List>) => R