import { SymmetricDifference } from "../set"
import { KeyIntersection, Omit } from "."

/**
 * @since 0.0.2
 */
export type KeySymmetricDifference<A, B> = SymmetricDifference<keyof A, keyof B>

/**
 * @since 0.0.2
 */
export type ObjectSymmetricDifference<A, B> =
  & Omit<A, KeyIntersection<A, B>>
  & Omit<B, KeyIntersection<A, B>>