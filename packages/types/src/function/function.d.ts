import { List } from "../list/list";
import { Satisfies } from "../_meta/satisfies";

/**
 * Type representing a function
 */
export type Function<A extends any = List, R extends any = any> =
  (...args: Satisfies<A, List>) => R