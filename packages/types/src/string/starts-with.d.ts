
/**
 * whether string `S` starts with prefix `Prefix`
 */
export type StartsWith<Prefix extends string, S extends string> =
  S extends `${Prefix}${string}`
    ? 1
    : 0