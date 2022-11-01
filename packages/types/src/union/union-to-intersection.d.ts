/**
 * converts a union type into an intersection type
 */
export type UnionToIntersection<U> =
  (U extends any
    ? (_: U) => 0
    : never
  ) extends (_: infer I) => 0
    ? Extract<I, U> // I
    : never