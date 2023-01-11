import { Pick } from "./pick"
import { RequiredKeys } from "./required-keys"

/**
 * picks the required properties of `T`
 */

export type PickRequired<T> =
  Pick<
    T,
    RequiredKeys<T>
  >
