type _AsList<S extends string, Acc extends string[] = []> =
  S extends `${infer H}${infer T}` ? _AsList<T, [...Acc, H]>
  : Acc extends []
    ? [S]
    : Acc

/**
 * converts a string into a list of its constituent characters or template literal parts
 * 
 * @since 0.0.6
 */
export type AsList<S extends string> =
  _AsList<S>