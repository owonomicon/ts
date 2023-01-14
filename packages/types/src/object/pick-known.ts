import { Satisfies } from "../type/satisfies";
import { KnownKeys } from "./known-keys";
import { Pick } from "./pick";

/**
 * picks the known (i.e. non- index signature) keys of `T`
 */
export type PickKnown<T> =
  Pick<T, Satisfies<KnownKeys<T>, keyof T>>
