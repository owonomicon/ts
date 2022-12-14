import { SymmetricDifference } from "../set-theory/symmetric-difference"
import { KeyIntersection } from "./intersection"
import { Omit } from "./omit"

export type KeySymmetricDifference<A, B> = SymmetricDifference<keyof A, keyof B>

export type ObjectSymmetricDifference<A, B> =
  & Omit<A, KeyIntersection<A, B>>
  & Omit<B, KeyIntersection<A, B>>