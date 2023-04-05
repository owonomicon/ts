import { HKT, _ } from "."

export interface Constant<T> extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: T
}