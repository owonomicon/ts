import { List } from "./list"

/**
 * gets the length of list `L`
 */
export type Length<L extends List> = L['length']