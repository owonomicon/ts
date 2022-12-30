/**
 * checks if both `A` and `B` extend true
 */
export type And<A extends boolean, B extends boolean> =
  [A, B] extends [true, true]
    ? true
    : false