import { Bool } from "../bool/bool";
import { If } from "../bool/if";
import { List } from "./list";

/**
 * resultant list from appending `X` to the end of list `A`
 */
export type Append<A extends List, X, Optional extends Bool = 0> =
  If<
    Optional,
    [...A, X?],
    [...A, X]
  >