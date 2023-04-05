import { HKT, I, O } from "."

/**
 * evaluates HKT `Kind` with input `X`
 */
export type $<Kind extends HKT, X extends I<Kind>> =
  O<Kind & { readonly [HKT._]: X }>
