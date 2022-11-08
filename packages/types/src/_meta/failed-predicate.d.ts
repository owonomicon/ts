import { Nominal } from "./nominal";

declare const __FAILED__PREDICATE__: unique symbol

/**
 * a type to indicate that a condition has not been met.
 * useful for grepping, or discriminating between `never` as a possible valid type versus some condition not being fulfilled.
 */
export type FailedPredicate = Nominal<{}, typeof __FAILED__PREDICATE__>