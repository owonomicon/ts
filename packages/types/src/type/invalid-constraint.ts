/**
 * a type to flag a branch of a conditional type to only be reachable if a custom constraint has not been met.
 * 
 * use `Unreachable` instead if a conditional branch is _actually_ unreachable.
 * 
 * mostly useful for grepping.
 */
export type InvalidConstraint = never