import { Pick, ReadonlyKeys } from "."

/**
 * Picks the readonly properties of `T`.
 * 
 * @since 0.0.2
 */

export type PickReadonly<T> =
  Pick<
    T,
    ReadonlyKeys<T>
  >
