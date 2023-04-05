import { List } from "."

/**
 * makes a list mutable
 */
export type Mutable<L extends List> = [...L]