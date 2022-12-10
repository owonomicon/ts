import { List } from "./list";

/**
 * makes a list mutable
 */
type Mutable<L extends List> = [...L]