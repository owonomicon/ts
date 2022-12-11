import { List } from "./list";

/**
 * resultant list from prepending `X` to the front of list `A`
 */
export type Prepend<L extends List, X> = [X, ...L]