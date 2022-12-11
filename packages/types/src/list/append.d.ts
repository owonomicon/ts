import { List } from "./list";

type Options<Optional extends boolean = boolean> = { optional: Optional }

/**
 * resultant list from appending `X` to the end of list `A`
 */
export type Append<L extends List, X, Opts extends Options = Options<false>> =
  Opts extends Options<true>
    ? [...L, X?]
    : [...L, X]