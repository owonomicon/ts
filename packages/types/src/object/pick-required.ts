import { Pick, RequiredKeys } from "."

/**
 * picks the required properties of `T`
 * 
 * @since 0.0.2
 */

export type PickRequired<T> =
  Pick<
    T,
    RequiredKeys<T>
  >
