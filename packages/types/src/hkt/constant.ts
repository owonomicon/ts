import { HKT, _ } from "./hkt"

export interface Constant<T> extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: T
}