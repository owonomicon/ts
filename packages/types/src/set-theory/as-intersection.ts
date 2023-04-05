import { Unreachable } from "../type/unreachable"

/**
 * converts union `U` into an intersection of its members
 */
export type AsIntersection<U> =
  // distribute `U` into a contravariant position...
  (U extends unknown ? (_: U) => 0 : Unreachable) extends
  // so it gets inferred as an intersection
  (_: infer I) => 0
    ? I
    : Unreachable
