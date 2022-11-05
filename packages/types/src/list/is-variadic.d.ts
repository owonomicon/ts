import { Not } from "../bool/not";
import { Extends } from "../_meta/extends";
import { Length } from "./length";
import { List } from "./list";

/**
 * whether `T` is a variadic list
 */
export type IsVariadic<T> =
  T extends List
    ? Not<Extends<number, Length<T>>>
    : 0