import { HKT, _ } from "."

/**
 * @since 0.0.2
 */
export interface Constant<T> extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: T
}