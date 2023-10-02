import { List } from "."

/**
 * makes a list readonly
 * 
 * @since 0.0.2
 */
export type Readonly<L extends List> = readonly [...L]