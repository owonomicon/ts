import { Slice } from "../list"
import { Args, Function, Return } from "../function"

/**
 * omits the first `N` arguments of function `F`
 * 
 * @undefined_behavior `F` - see {@link Args}
 * @undefined_behavior `N` - see {@link Slice}
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = SliceArgs<(a: 1, b: 2, c: 3) => void, 1> // (b: 2, c: 3) => void
 * type e1 = SliceArgs<(a: 1, b: 2, c: 3) => void, 2> // (c: 3) => void
 * type e2 - SliceArgs<(a: 1, b: 2, c: 3) => void, 3> // () => void
 * ```
 */
export type SliceArgs<F extends Function, N extends number> =
  (...args: Slice<Args<F>, N>) => Return<F>

/**
 * omits the first argument of function `F`
 * 
 * @undefined_behavior `F` - see {@link SliceArgs}
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = SliceFirstArg<(a: 1,, b: 2, c: 3) => void> // (b: 2, c: 3) => void
 * ```
 */
export type SliceFirstArg<F extends Function> =
  SliceArgs<F, 1>