
/**
 * whether type `E` is a member of union type `S`
 * 
 * @since 0.0.2
 */
export type IsMember<S, E> =
  [E] extends [S]
    ? true
    : false