import { Length } from "../../string/length"

export type PadLeadingZeros<S extends string, N extends number> =
  Length<S> extends N
    ? S
    : PadLeadingZeros<`0${S}`, N>