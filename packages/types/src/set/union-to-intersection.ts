import { InferContravariant, Contravariant } from "."

/**
 * converts union `U` into an intersection of its members
 */
export type UnionToIntersection<U> =
  InferContravariant<Contravariant<U>>