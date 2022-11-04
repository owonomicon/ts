
/**
 * whether type `E` is a member of union type `S`
 */
export type IsMember<S, E> =
  [E] extends [S]
    ? 1
    : 0