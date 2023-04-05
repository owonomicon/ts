import { Satisfies } from "../type"
import { KnownKeys, Pick } from "."

/**
 * picks the known (i.e. non- index signature) keys of `T`
 */
export type PickKnown<T> =
  Pick<T, Satisfies<KnownKeys<T>, keyof T>>
