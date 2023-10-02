import { List } from "../list"
import { Unreachable } from "../type"
import { Function } from "."

/**
 * extracts the arguments of function `F`
 * 
 * @warning
 * fails to capture optionality and loses labels in functions with optional parameters and tuple spread parameters
 * 
 * @undefined_behavior `F` is `never`
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = Args<(_: never) => void>           // [_: never]
 * type e1 = Args<(a: 1, b: 0) => never>        // [a: 1, b: 0]
 * type e2 = Args<(a: 1, b?: 0) => never>       // [a: 1, b?: 0 | undefined]
 * 
 * type w0 - Args<(_?: 1, ...__: [0]) => never> // [1 | undefined, string]
 * ```
 */
export type Args<F extends Function> =
  F extends (...args: (infer A extends List)) => any
    ? A
    : Unreachable