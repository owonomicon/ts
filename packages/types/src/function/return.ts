import { Unreachable } from "../type"
import { Function } from "."

/**
 * gets the return type of function `F`
 * 
 * @undefined_behavior `F` is `never`
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = Return<() => string>         // string
 * type e1 = Return<(a: string) => never> // never
 * type e2 = Return<(_: never) => void>   // void
 * ```
 */
export type Return<F extends Function> =
  // use `never` over `any` to match against `never` type parameters
  // use `never` over `never[] to match variadic tuple parameters
  F extends (...args: never) => infer R
    ? R
    : Unreachable