/**
 * whether `A` extends `B`.
 * 
 * @warning
 * DO NOT USE THIS TO TEST FOR `never`.
 * use `IsNever<T>` to check if type `T` is `never`
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

/**
 * checks whether `A` extends `B` without distributing over `A`
 */
 export type ExtendsNondistributive<A, B> =
 [A] extends [B]
   ? true
   : false
