/**
 * gets the set intersection of union types `A` and `B`
 * 
 * @since 0.0.2
 */
export type SetIntersection<A, B> =
  A extends B ? A
  : B extends A ? B
  : never