import { DigitList } from "./digit-list"

/**
 * @since 0.0.6
 */
export type Init<L extends DigitList> =
  L extends [...infer I, any]
    ? I
    : []