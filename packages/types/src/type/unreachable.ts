/**
 * a type to flag a branch of a conditional type to be unreachable.
 * 
 * this type should only be used if a branch is _actually_ unreachable.
 * if the branch is unreachable given an invalid custom constraint, use `InvalidConstraint` instead.
 * 
 * mostly useful for grepping.
 * 
 * @since 0.0.2
 */
 export type Unreachable = never