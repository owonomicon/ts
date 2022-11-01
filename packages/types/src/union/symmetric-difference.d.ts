/**
 * gets the symmetric difference of union types A and B (i.e. the "XOR" of the two types)
 */
 export type SymmetricDifference<A, B> = Exclude<A | B, A & B>
