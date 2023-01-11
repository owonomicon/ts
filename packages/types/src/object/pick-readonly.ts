import { Pick } from "./pick"
import { ReadonlyKeys } from "./readonly-keys"

/**
 * Picks the readonly properties of `T`.
 */

export type PickReadonly<T> =
  Pick<
    T,
    ReadonlyKeys<T>
  >
