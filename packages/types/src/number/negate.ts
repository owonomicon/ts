import { AsNumber } from "../string"

/**
 * negates a number `N`
 * 
 * @since 0.0.2
 */
export type Negate<N extends number> =
  N extends `-${infer Abs extends number}`
    ? Abs
    : AsNumber<`-${N}`>