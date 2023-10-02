import { Exclude } from "../set"
import { Pick } from "."

/**
 * picks the properties of `T` whose keys do not extend `K`
 * 
 * @since 0.0.2
 */
export type Omit<T, K> =
  Pick<T, Exclude<keyof T, K>>
