import { Unreachable } from "../type/unreachable"
import { Function } from "./function"

/**
 * gets the return type of function `F`
 */
export type Return<F extends Function> =
  // use `never` over `any` to match against `never` type parameters
  // use `never` over `never[] to match variadic tuple parameters
  F extends (...args: never) => infer R
    ? R
    : Unreachable