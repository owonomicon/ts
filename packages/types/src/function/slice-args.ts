import { Slice } from "../list/slice"
import { Args } from "./args"
import { Function } from "./function"
import { Return } from "./return"

/**
 * omits the first `N` arguments of function `F`
 */
export type SliceArgs<F extends Function, N extends number> =
  (...args: Slice<Args<F>, N>) => Return<F>

/**
 * omits the first argument of function `F`
 */
export type SliceFirstArg<F extends Function> =
  SliceArgs<F, 1>
