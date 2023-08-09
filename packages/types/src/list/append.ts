import { List } from "."

/**
 * appends `X` as an optional element to list `L`
 */
export type AppendOptional<L extends List, X> =
  [...L, X?]

/**
 * appends `X` to list `L`
 * 
 * @param L     - list to append to
 * @param X     - element to append to `L`
 */
export type Append<L extends List, X> =
  [...L, X]