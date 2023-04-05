import { List } from "."

/**
 * gets the length of list `L`
 */
export type Length<L extends List> = L['length']