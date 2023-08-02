import { DigitList } from "./digit-list"

/**
 * @since 0.0.6
 */
export type Last<L extends DigitList> =
  L extends [...any, infer X]
    ? X
    : 0