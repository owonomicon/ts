/**
 * gets the absolute value of number `N`
 * 
 * @since 0.0.2
 */
export type Abs<N extends number> =
  `${N}` extends `-${infer A extends number}`
    ? A
    : N