import { HKT, _, I } from "./hkt"

export namespace Identity {
  interface Of<T> extends HKT {
    [HKT.i]: T
    [HKT.o]: I<this>
  }
}

export interface Identity extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: I<this>
}