import { List } from "."

type Options<Optional extends boolean = boolean> = { optional: Optional }

/**
 * appends `X` to list `L`
 */
type AppendRequired<L extends List, X> =
  [...L, X]

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
 * @param Opts  - append options. whether `X` should be appended as an optional element.
 */
export type Append<L extends List, X, Opts extends Options = Options<false>> =
  Opts extends Options<true>
    ? AppendOptional<L, X>
    : AppendRequired<L, X>