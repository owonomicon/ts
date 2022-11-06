
/**
 * whether string `S` contains substring `Infix`
 */
export type Contains<Infix extends string, S extends string> =
  S extends `${string}${Infix}${string}`
    ? 1
    : 0