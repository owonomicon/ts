/**
 * Ternary conditional type.
 * @template Condition the type to evaluate
 * @template Then resultant type if `Condition` evaluates to `True`
 * @template Else resultant type if `Condition<A, B>` does not evaluate to `True`
 */ 
export type If<
  Condition,
  Then = Condition,
  Else = never,
> =
  Condition extends true
    ? Then
    : Else