import { Not } from "../bool/not";
import { Extends } from "../_meta/extends";
import { Length } from "./length";
import { List } from "./list";

/**
 * whether `T` is a finite length array type (including readonly)
 */
export type IsFiniteList<T> =
  T extends List
    ? Not<Extends<number, Length<T>>>
    : 0