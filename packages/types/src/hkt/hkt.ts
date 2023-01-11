/**
 * the HKT interface provides a convenient way to define types that abstract over yet-undefined types by deferring evaluation of a type.
 * conceptually, an HKT can be thought of as a function that takes in an input type and produces an output type.
 * 
 * an HKT consists of 3 keys:
 * - `HKT._`, the deferred type
 * - `HKT.i`, the input type the HKT will operate on
 * - `HKT.o`, the resultant type produced from the input
 * 
 * below is an example of a custom HKT type, with comments noting important details to keep in mind when making a custom HKT type.
 * ```ts
 * interface MyHKT<T> extends HKT {  // like any other type, an HKT can use generics
 *   [HKT.i]: Satisfies<_<this>, MyDesiredInputType> // rather than directly setting the input type, we need to use the `Satisfies` type on the deferred type `this[HKT._]` to preserve the deferred type
 *   [HKT.o]: MyDesiredOutputType<I<this>, T> // use `this[HKT.i]` (or use the helper type `I`) to refer to the input type
 * }
 * ```
 * 
 * To evaluate an HKT, use the `$` type, passing in the HKT to evaluate and then the type evaluate on.
 */
export declare interface HKT<I = unknown, O = unknown> {
  readonly [HKT._]: unknown
  [HKT.i]: I
  [HKT.o]: O
}

export declare namespace HKT {
  const _: unique symbol
  type _ = typeof _
  
  const i: unique symbol
  type i = typeof i

  const o: unique symbol
  type o = typeof o
}

export type _<Kind extends HKT> = Kind[HKT._]

/**
 * extracts the expected input of HKT `Kind`
 */
export type I<Kind extends HKT> = Kind[HKT.i]

/**
 * extracts the output of HKT `Kind`
 */
export type O<Kind extends HKT> = Kind[HKT.o]