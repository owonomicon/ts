import { HKT, _, I } from "./hkt"

export declare namespace Identity {
  interface Of<T> extends HKT {
    [HKT.i]: T
    [HKT.o]: I<this>
  }
}

export declare interface Identity extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: I<this>
}