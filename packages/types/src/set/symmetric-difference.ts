import { Exclude } from "."

/**
 * gets the symmetric difference of union types A and B (i.e. the "XOR" of the two types)
 * 
 * @since 0.0.2
 */
 export type SymmetricDifference<A, B> = Exclude<A | B, A & B>
