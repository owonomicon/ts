import { Exclude } from "../set-theory/exclude";
import { Pick } from "./pick";

/**
 * picks the properties of `T` whose keys do not extend `K`
 */
export type Omit<T, K> =
  Pick<T, Exclude<keyof T, K>>
