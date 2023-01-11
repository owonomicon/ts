import { Unreachable } from "../type/unreachable"
import { Function } from "./function"

/**
 * gets the return type of function `F`
 */
export type Return<F extends Function> =
  F extends (...args: any) => infer R // use any vs `List` or `any[]` to successfully match against variadic tuple parameters
    ? R
    : Unreachable