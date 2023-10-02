import { HKT, I, O } from "."

/**
 * evaluates HKT `Kind` with input `X`
 * 
 * @since 0.0.2
 */
export type $<Kind extends HKT, X extends I<Kind>> =
  O<Kind & { readonly [HKT._]: X }>
