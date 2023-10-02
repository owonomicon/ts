import { HKT, _, I } from "."

/**
 * @since 0.0.2
 */
export declare namespace Identity {
  interface Of<T> extends HKT {
    [HKT.i]: T
    [HKT.o]: I<this>
  }
}

/**
 * @since 0.0.2
 */
export declare interface Identity extends HKT {
  [HKT.i]: _<this>
  [HKT.o]: I<this>
}