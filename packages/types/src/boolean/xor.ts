import { HKT, I, Identity, _ } from "../hkt"
import { $Exists, $Fold } from "../hkt/list"
import { List, IsEmpty } from "../list"
import { Satisfies, Unreachable } from "../type"

/**
 * gets the boolean XOR of booleans `A` and `B`
 * 
 * @remarks
 * does not distribute over `A` or `B`.
 * 
 * @undefined_behavior `A` is `any`, `unknown`, `never`, or `boolean`
 * @undefined_behavior `B` is `any`, `unknown`, `never`, or `boolean`
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = Xor<true, true>    // false
 * type e1 = Xor<true, false>   // true
 * type e2 = Xor<false, true>   // true
 * type e3 = Xor<false, false>  // false
 * ```
 */
export type Xor<A extends boolean, B extends boolean> =
  /* as of TS4.9, conditional types are only deferred for single-element tuples, not multi-element ones.
   * this should be fixed in https://github.com/microsoft/TypeScript/pull/52091/, slated for the TS5.0 milestone.
   * also relevant: https://github.com/microsoft/TypeScript/issues/51145#issuecomment-1276804047
   * 
   * note: as of ts5.3 seems there are still some questions regarding that syntax (?). see https://github.com/microsoft/TypeScript/issues/56270
   */
  // [A, B] extends [true, false] ? true
  // : [A, B] extends [false, true] ? true
  // : false
  [A] extends [true]
    ? [B] extends [false]
      ? true
      : false
  : [A] extends [false]
    ? [B] extends [true]
      ? true
      : false
  : false


export namespace Xor {

  /**
   * gets the boolean XOR of booleans `A` and `B`
   * 
   * @remarks
   * distributes over `A` and `B`
   * 
   * @undefined_behavior `A` is `any`, `unknown`, `never`, or `boolean`
   * @undefined_behavior `B` is `any`, `unknown`, `never`, or `boolean`
   * 
   * @since 0.0.9
   */
  export type Distributive<A extends boolean, B extends boolean> =
    A extends true
      ? B extends false
        ? true
        : false 
    : A extends false
      ? B extends true
        ? true
        : false
    : false

  interface _Xor extends HKT<[boolean, boolean], boolean> {
    [HKT.i]: Satisfies<_<this>, [boolean, boolean]>
    [HKT.o]: I<this> extends [infer A extends boolean, infer B extends boolean]
      ? Xor<A, B>
      : Unreachable
  }

  /**
   * unbounded logical XOR (PARITY mod 2)
   * 
   * @undefined_behavior an element is `any`, `unknown`, `never`, or `boolean`
   * 
   * @since 0.0.9
   */
  export type Unbounded<L extends List<boolean>, Vacuous = false> =
    IsEmpty<L> extends true
      ? Vacuous
      : $Fold<_Xor, false, L>
}