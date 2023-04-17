
/**
 * whether type `E` is a member of union type `S`
 */
export type IsMember<S, E> =
  [E] extends [S]
    ? true
    : false