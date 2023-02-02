import { List } from "./list"

/**
 * makes a list readonly
 * 
 */
export type Readonly<L extends List> = readonly [...L]