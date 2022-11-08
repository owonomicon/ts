import { RequiredKeys } from "./required-keys";
import { Pick } from "./pick";

/**
 * picks the required properties of `T`
 */

export type PickRequired<T> =
  Pick<
    T,
    RequiredKeys<T>
  >
