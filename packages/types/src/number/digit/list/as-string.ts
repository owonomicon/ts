import { $, Compose, List, String } from "../../../hkt"
import { DigitList } from "."

/**
 * @since 0.0.6
 */
export type AsString<L extends DigitList> =
  $<Compose<[String.Join<''>, List.Map<String.ToString>]>, L>