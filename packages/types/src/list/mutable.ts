import { List } from "./list"

/**
 * makes a list mutable
 */
export type Mutable<L extends List> = [...L]