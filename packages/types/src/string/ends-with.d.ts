
/**
 * whether string `S` ends with suffix `Suffix`
 */
export type EndsWith<Suffix extends string, S extends string> =
  S extends `${string}${Suffix}`
    ? 1
    : 0