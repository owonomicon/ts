import { OptionalKeys, Pick } from "."

/**
 * Picks the optional properties of `T`
 */
export type PickOptional<T> =
  Pick<
    T,
    OptionalKeys<T>
  >
