/**
 * checks whether `A` extends `B` without distributing over `A`
 */
export type ExtendsNondistributive<A, B> =
  [A] extends [B]
    ? true
    : false
