/**
 * checks if either `A` or `B` do not extend `false`
 */
export type Or<A extends boolean, B extends boolean> =
  [A, B] extends [false, false]
    ? false
    : true