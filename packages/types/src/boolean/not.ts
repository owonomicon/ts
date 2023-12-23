/**
 * negates boolean `T`
 * 
 * @remarks
 * distributes over `T`
 * 
 * @undefined_behavior `T` is `any`, `unknown`, `never`, or `boolean`
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = Not<never>   // never
 * type e1 = Not<false>   // true
 * type e2 = Not<true>    // false
 * type e3 = Not<boolean> // boolean
 * ```
 */
export type Not<T extends boolean> = 
  T extends true
    ? false
    : true
