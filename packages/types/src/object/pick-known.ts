import { Satisfies } from "../type"
import { KnownKeys, Pick } from "."

/**
 * picks the known (i.e. non- index signature) keys of `T`
 * 
 * @since 0.0.2
 */
export type PickKnown<T> =
  Pick<T, Satisfies<KnownKeys<T>, keyof T>>
