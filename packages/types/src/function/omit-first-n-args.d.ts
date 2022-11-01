import { OmitFirstN } from "../list/omit-first-n"

/**
 * omits the first `N` arguments of function `F`
 */
export type OmitFirstNArgs<F, N extends number> =
  F extends (...args: infer A) => infer R
    ? (...args: OmitFirstN<A, N>) => R
    : never

/**
 * omits the first argument of function `F`
 */
export type OmitFirstArg<F> = OmitFirstNArgs<F, 1>