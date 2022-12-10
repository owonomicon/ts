/**
 * gets the set intersection of union types `A` and `B`
 */
export type SetIntersection<A, B> =
  A extends B ? A
  : B extends A ? B
  : never