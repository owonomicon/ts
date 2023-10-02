import { InferContravariant, Contravariant } from "."

/**
 * converts union `U` into an intersection of its members
 * 
 * @since 0.0.6
 */
export type UnionToIntersection<U> =
  InferContravariant<Contravariant<U>>