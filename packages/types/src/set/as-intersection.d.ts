import { Select } from "./select";

/**
 * converts union `U` into an intersection of its members
 */
export type AsIntersection<U> =
  (U extends unknown
    ? (_: U) => 0
    : never
  ) extends (_: infer I) => 0
    ? Select<I, U> // I
    : never
