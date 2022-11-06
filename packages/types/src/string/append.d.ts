/**
 * append string `T` to string `S`
 */
export type Append<T extends string, S extends string> =
  `${S}${T}`