/**
 * whether `A` extends `B`.
 * 
 * @warning
 * DO NOT USE THIS TO TEST FOR `never`.
 * use `IsNever<T>` to check if type `T` is `never`
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Extends<never, unknown>  // never
 * type e1 = Extends<0, 1>            // false 
 * type e2 = Extends<0, number>       // true
 * type e3 = Extends<string, never>   // false
 */
export type Extends<A, B> =
  A extends B
    ? true
    : false

export namespace Extends {
  /**
   * checks whether `A` extends `B`
   * 
   * @remarks
   * does not distribute over `A`
   * 
   * @since 0.0.9
   */
  export type Nondistributive<A, B> =
    [A] extends [B]
      ? true
      : false
}
