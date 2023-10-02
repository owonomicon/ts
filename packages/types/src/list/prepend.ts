import { List } from "."

/**
 * resultant list from prepending `X` to the front of list `A`
 * 
 * @since 0.0.2
 */
export type Prepend<L extends List, X> = [X, ...L]