import { List } from "./list"

/**
 * makes a list readonly
 * 
 */
type Readonly<L extends List> = readonly [...L]