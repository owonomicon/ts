/**
 * prepend string `T` to string `S`
 */
export type Prepend<T extends string, S extends string> =
  `${T}${S}`