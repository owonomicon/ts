import { Unreachable } from "../type"
import { List } from "."

/**
 * gets the type of the elements of list `L`
 * 
 * @since 0.0.2
 */
export type ElementOf<L extends List> =
  L extends List<infer U>
    ? U
    : Unreachable