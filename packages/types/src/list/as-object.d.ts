import { If } from "../bool/if";
import { Omit } from "../object/omit";
import { Increment, Iterate, Iteration, Value } from "../_meta/iterate";
import { ShallowResolve } from "../_meta/resolve";
import { Unreachable } from "../_meta/unreachable";
import { ElementOf } from "./element-of";
import { IsVariadic } from "./is-variadic";
import { List } from "./list";
import { OmitFirstN } from "./omit-first-n";

/**
 * get the "length" of the resultant named object from a list
 */
type _AsObject<A extends List, Named, N extends Iteration = Iterate<0>> =
  Value<Increment<N>> extends keyof Named ? _AsObject<A, Named, Increment<N>>
  : `${Value<Increment<N>>}` extends keyof Named ? _AsObject<A, Named, Increment<N>>
  : Value<Increment<N>>

/**
 * coerces an array type into an object.
 * this can be useful for then e.g. detecting optional arguments in the parameters of a function
 * 
 * @example
 * type e0 = AsObject<[]> // {}
 * type e1 = AsObject<[string, number, object]> // { 0: string, 1: number, 2: object }
 * 
 * type e2 = AsObject<[string, number, object, ...boolean[]]> // { [x: number]: boolean, 0: string, 1: number, 2: object }
 * type e2a = e2[0] // string
 * type e2b = e2[3] // boolean
 * 
 * type e3 = AsObject<[string, number, object, ...boolean[], null]> // { [x: number]: boolean | null, 0: string, 1: number, 2: object } // all types following the first spread of a variadic tuple are combined
 * 
 * type e4 = AsObject<[string, number, object?, ...boolean[]] // { [x: number]: boolean, 0: string, 1: number, 2?: object | undefined } // optionality is preserved (and TypeScript converts `T?` to `(T | undefined)?`)
 */
export type AsObject<A extends List> =
  ShallowResolve<
    If<
      IsVariadic<A>,  
      Omit<A, keyof any[]> extends infer X
        ? { [x: number]: ElementOf<OmitFirstN<A, _AsObject<A, X>>> } & X
        : Unreachable,
      Omit<A, keyof any[]>
    >  
  >
