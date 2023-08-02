import { String } from "../../.."
import { DigitList } from "."
import { AsString } from "./as-string"

/**
 * @since 0.0.6
 */
export type AsNumber<L extends DigitList> =
  String.AsNumber<AsString<L>>