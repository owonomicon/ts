import { Unreachable } from "../../../type"
import { String } from "../../.."
import { DigitString } from "./digit-string"

/**
 * @since 0.0.6
 */
export type AsList<S extends DigitString<S>> =
  S extends string
    ? String.AsList<S>
    : Unreachable