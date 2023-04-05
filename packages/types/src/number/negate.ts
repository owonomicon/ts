import { AsNumber } from "../string"

/**
 * negates a number `N`
 */
export type Negate<N extends number> =
  N extends `-${infer Abs extends number}`
    ? Abs
    : AsNumber<`-${N}`>