import type { SetIntersection } from "../set-theory/intersection"

/**
 * gets the intersection of the keys of `A` and `B`
 */
export type KeyIntersection<A, B> = SetIntersection<keyof A, keyof B>

/**
 * gets the intersection of `A` and `B`
 */
export type ObjectIntersection<A, B, PickValues extends A | B = A | B> = {
  [K in KeyIntersection<A, B>]: PickValues[K]
}