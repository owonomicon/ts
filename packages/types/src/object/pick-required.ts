import { Pick, RequiredKeys } from "."

/**
 * picks the required properties of `T`
 */

export type PickRequired<T> =
  Pick<
    T,
    RequiredKeys<T>
  >
