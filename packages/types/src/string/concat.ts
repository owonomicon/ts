/**
 * concatenate strings `S` and `T` string `T` to string `S`
 * 
 * @since 0.0.2
 */
export type Concat<S extends string, T extends string> =
  `${S}${T}`