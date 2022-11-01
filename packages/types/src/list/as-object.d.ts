import { If } from "../bool/if";
import { IsTuple } from "./is-tuple";
import { List } from "./list";

/**
 * coerces an array type into an object.
 * this can be useful for then e.g. detecting optional arguments in the parameters of a function
 */
export type AsObject<A extends List> = 
  If<
    IsTuple<A>,  
    Omit<A, keyof any[]>,
    Pick<A, number>
  >

type o = AsObject<[string, number, object?, ...null[]]> // TODO: capture spread arguments. maybe some way to detect largest index without spread, and construct a [x in number]: x extends (anything < first spread index) ? A[x] : [the spread]
