import { List } from "."

/**
 * makes a list mutable
 * 
 * @since 0.0.2
 */
export type Mutable<L extends List> = [...L]