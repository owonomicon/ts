/**
 * concatenate strings `S` and `T` string `T` to string `S`
 */
export type Concat<S extends string, T extends string> =
  `${S}${T}`