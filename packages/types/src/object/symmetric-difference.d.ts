import type { SymmetricDifference } from "../set/symmetric-difference"
import { KeyIntersection } from "./intersection"

export type KeySymmetricDifference<A, B> = SymmetricDifference<keyof A, keyof B>

export type ObjectSymmetricDifference<A, B> =
  & Omit<A, KeyIntersection<A, B>>
  & Omit<B, KeyIntersection<A, B>>