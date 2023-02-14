/**
 * ternary conditional type. resolves to `Then` if `Condition` is true, otherwise `Else`
 * 
 * @remarks
 * distributes over `Condition`
 * 
 * @undefined_behavior `Condition` is `never`
 * 
 * @template Condition the type to evaluate
 * @template Then resultant type if `Condition` evaluates to `true`
 * @template Else resultant type if `Condition` does not evaluate to `true`. defaults to `never`
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = If<never, 1, 0>    // never
 * type e1 = If<boolean, 1, 0>  // 0 | 1
 * type e2 = If<true, 1, 0>     // 1
 * type e3 = If<false, 1, 0>    // 0
 * type e4 = If<false, 1>       // never
 * ```
 */ 
export type If<
  Condition extends boolean,
  Then,
  Else = never,
> =
  Condition extends true
    ? Then
    : Else
