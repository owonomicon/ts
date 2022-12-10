import { Unreachable } from "../_meta/unreachable";
import { List } from "./list";

/**
 * gets the element of a list
 */
export type ElementOf<T extends List> =
  T extends List<infer U>
    ? U
    : Unreachable