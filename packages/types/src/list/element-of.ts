import { Unreachable } from "../type/unreachable"
import { List } from "./list"

/**
 * gets the type of the elements of list `L`
 */
export type ElementOf<L extends List> =
  L extends List<infer U>
    ? U
    : Unreachable