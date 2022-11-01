import { Extends } from "../_meta/extends";
import { List } from "./list";

/**
 * whether `T` is an array type (including readonly and tuples)
 */
export type IsList<T> =
  Extends<T, List>