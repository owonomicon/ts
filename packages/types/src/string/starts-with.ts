
/**
 * whether string `S` starts with prefix `Prefix`
 * 
 * @since 0.0.2
 */
export type StartsWith<Prefix extends string, S extends string> =
  S extends `${Prefix}${string}`
    ? true
    : false