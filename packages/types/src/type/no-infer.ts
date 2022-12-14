/**
 * prevents `T` from being inferred.
 * 
 * useful for when a type to be inferred is used in multiple places, but should specifically be inferred from a single place
 * 
 * @see https://github.com/Microsoft/TypeScript/issues/14829
 * 
 * @example
 * ```ts
 * // we want `A` to only be inferred from `f`
 * function callWithArgs<A extends unknown[]>(f: (...args: A) => unknown, ...args: NoInfer<A>) {
 *    // ...
 * }
 * ```
 */
export type NoInfer<T> =
  [T][T extends any ? 0 : never]