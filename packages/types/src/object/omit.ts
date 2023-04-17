import { Exclude } from "../set"
import { Pick } from "."

/**
 * picks the properties of `T` whose keys do not extend `K`
 */
export type Omit<T, K> =
  Pick<T, Exclude<keyof T, K>>
