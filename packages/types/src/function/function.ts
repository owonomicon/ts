import { List } from "../list/list"
import { Satisfies } from "../type/satisfies"

/**
 * function with arguments `A` and return type `R`
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = Function<string[], number> // (...args: string[]) => number
 * ```
 */
export type Function<
  // `A` has to default to `never` for `extends Function` to work fine
  A extends List = never,
  R extends unknown = unknown
> = 
  (...args: Satisfies<A, List>) => R