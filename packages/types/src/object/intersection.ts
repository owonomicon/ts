import { SetIntersection } from "../set"

/**
 * gets the intersection of the keys of `A` and `B`
 * 
 * @since 0.0.2
 */
export type KeyIntersection<A, B> = SetIntersection<keyof A, keyof B>

/**
 * gets the intersection of `A` and `B`
 * 
 * @since 0.0.2
 */
export type ObjectIntersection<A, B, PickValues extends A | B = A | B> = {
  [K in KeyIntersection<A, B>]: PickValues[K]
}