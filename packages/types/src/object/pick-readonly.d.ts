import { ReadonlyKeys } from "./readonly-keys"
import { Pick } from "./pick"

/**
 * Picks the readonly properties of `T`.
 */

export type PickReadonly<T> =
  Pick<
    T,
    ReadonlyKeys<T>
  >
