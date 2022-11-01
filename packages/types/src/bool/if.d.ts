/**
 * Ternary conditional type.
 * @template Condition the type to evaluate
 * @template Then resultant type if `Condition` evaluates to `True`
 * @template Else resultant type if `Condition<A, B>` does not evaluate to `True`
 * @template True: type representing "true" for `Condition` (i.e. `Condition` extends `True`)
 */ 
export type If<
  Condition,
  Then = Condition,
  Else = never,
  True = 1
> =
  Condition extends True
    ? Then
    : Else