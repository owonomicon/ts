import { List } from "../list/list";
import { Satisfies } from "../type/satisfies";
import { Unreachable } from "../type/unreachable";
import { Function } from "./function";

/**
 * extracts the arguments of function `F`
 */
export type Args<F extends Function> =
  F extends (...args: infer A) => any  // use A vs `List<A>` or `A[]` to successfully match against variadic tuple parameters
    ? Satisfies<A, List>
    : Unreachable