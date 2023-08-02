import { AsNumber as _AsNumber } from "../../../string"
import { Unreachable } from "../../../type"
import { DigitString } from "./digit-string"

/**
 * @since 0.0.6
 */
export type AsNumber<S extends DigitString<S>> =
  S extends string
    ? _AsNumber<S>
    : Unreachable