/**
 * gets the absolute value of number `N`
 */
export type Abs<N extends number> =
  `${N}` extends `-${infer A extends number}`
    ? A
    : N