import { HKT, _, I } from "."
import { Satisfies as _Satisfies } from "../type"

export declare namespace Identity {
  /**
   * identity of type `T`
   * 
   * @since 0.0.2
   */
  interface Of<T> extends HKT {
    [HKT.i]: T
    [HKT.o]: I<this>
  }

  /**
   * identity of type that satisfies `T`
   * 
   * @since 0.0.9
   */
  interface Satisfies<T> extends HKT {
    [HKT.i]: _Satisfies<_<this>, T>
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