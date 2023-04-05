import { SymmetricDifference } from "../set-theory"
import { KeyIntersection, Omit } from "."

export type KeySymmetricDifference<A, B> = SymmetricDifference<keyof A, keyof B>

export type ObjectSymmetricDifference<A, B> =
  & Omit<A, KeyIntersection<A, B>>
  & Omit<B, KeyIntersection<A, B>>