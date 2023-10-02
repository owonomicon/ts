import { OptionalKeys, Pick } from "."

/**
 * Picks the optional properties of `T`
 * 
 * @since 0.0.2
 */
export type PickOptional<T> =
  Pick<
    T,
    OptionalKeys<T>
  >
