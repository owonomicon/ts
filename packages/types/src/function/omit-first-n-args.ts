import { OmitFirstN } from "../list/omit-first-n"
import { Args } from "./args"
import { Function } from "./function"
import { Return } from "./return"

/**
 * omits the first `N` arguments of function `F`
 */
export type OmitFirstNArgs<F extends Function, N extends number> =
  (...args: OmitFirstN<Args<F>, N>) => Return<F>

/**
 * omits the first argument of function `F`
 */
export type OmitFirstArg<F extends Function> = OmitFirstNArgs<F, 1>