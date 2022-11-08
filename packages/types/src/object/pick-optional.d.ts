import { OptionalKeys } from "./optional-keys";
import { Pick } from "./pick";

/**
 * Picks the optional properties of `T`
 */
export type PickOptional<T> =
  Pick<
    T,
    OptionalKeys<T>
  >
