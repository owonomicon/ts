import { List } from "./list";

/**
 * resultant list from prepending `X` to the front of list `A`
 */
export type Prepend<A extends List, X> = [X, ...A]