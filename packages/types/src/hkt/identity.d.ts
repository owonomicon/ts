import { HKT } from "./hkt"

export namespace Identity {
  type Of<T> = Identity & { readonly [HKT._]: T }
}

export type Of<T> = Identity.Of<T>

export interface Identity extends HKT {
  [HKT.i]: this[HKT._]
  [HKT.o]: HKT.I<this>
}