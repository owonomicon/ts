import { List } from "."

/**
 * gets the length of list `L`
 * 
 * @since 0.0.2
 */
export type Length<L extends List> = L['length']