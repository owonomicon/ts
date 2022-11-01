import { List } from "./list";

/**
 * resultant list from appending `X` to the end of list `A`
 */
export type Append<A extends List, X> = [...A, X]