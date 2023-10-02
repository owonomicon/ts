/**
 * prepend string `T` to string `S`
 * 
 * @since 0.0.2
 */
export type Prepend<T extends string, S extends string> =
  `${T}${S}`