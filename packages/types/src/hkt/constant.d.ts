import { HKT } from "./hkt"

export interface Constant<T> extends HKT {
  [HKT.i]: this[HKT._]
  [HKT.o]: T
}