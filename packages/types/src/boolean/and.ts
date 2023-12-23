import { Identity } from "../hkt"
import { $All } from "../hkt/list"
import { IsEmpty, List } from "../list"

/**
 * gets the boolean AND of booleans `A` and `B`.
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
 * type e0 = And<never, true>   // true
 * type e1 = And<true, never>   // true
 * type e1 = And<true, true>    // true
 * type e2 = And<true, false>   // false
 * type e3 = And<false, false>  // false
 * type e4 = And<false, false>  // false
 * type e5 = And<boolean, true> // false
 * ```
 */
export type And<A extends boolean, B extends boolean> =
  /* as of TS4.9, conditional types are only deferred for single-element tuples, not multi-element ones.
   * this should be fixed in https://github.com/microsoft/TypeScript/pull/52091/, slated for the TS5.0 milestone.
   *
   * note: as of ts5.3 seems there are still some questions regarding that syntax (?). see https://github.com/microsoft/TypeScript/issues/56270
   */
  // [A, B] extends [true, true]
  //   ? true
  //   : false
  [A] extends [true]
    ? [B] extends [true]
      ? true
      : false
    : false

export namespace And {

  /**
   * gets the boolean AND of booleans `A` and `B`
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
      ? B extends true
        ? true
        : false
    : false

  /**
   * unbounded logical AND
   * 
   * @undefined_behavior an element is `any`, `unknown`, `never`, or `boolean`
   * 
   * @since 0.0.9
   */
  export type Unbounded<L extends List<boolean>, Vacuous = true> =
    IsEmpty<L> extends true
      ? Vacuous
      : $All<Identity.Satisfies<boolean>, L>
}