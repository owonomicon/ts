import { Pick, ReadonlyKeys } from "."

/**
 * Picks the readonly properties of `T`.
 */

export type PickReadonly<T> =
  Pick<
    T,
    ReadonlyKeys<T>
  >
