import { Serializable } from "../../string"
import { Satisfies } from "../../type"
import { HKT, I, _ } from ".."

/**
 * stringifies a serializable
 * 
 * @since 0.0.5
 */
export interface ToString extends HKT {
  [HKT.i]: Satisfies<_<this>, Serializable>
  [HKT.o]: `${I<this>}`
}