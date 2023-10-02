import { Length } from "../../string"

/**
 * @since 0.0.2
 */
export type PadLeadingZeros<S extends string, N extends number> =
  Length<S> extends N
    ? S
    : PadLeadingZeros<`0${S}`, N>