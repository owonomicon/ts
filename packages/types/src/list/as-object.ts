import { If } from "../boolean"
import { _IncNonneg } from "../number/int"
import { Omit } from "../object"
import { ShallowResolve, Unreachable } from "../type"
import { ElementOf, IsVariadic, List, Slice } from "."

/**
 * get the "length" of a list converted to an object, with non-index and variadic keys removed.
 * 
 * i.e., gets the number of leading non-variadic elements in the original list.
 */
type _LeadingNonvariadicLengthOfListObject<O, N extends number = 0, NPlusOne extends number = _IncNonneg<N>> =
  NPlusOne extends keyof O ? _LeadingNonvariadicLengthOfListObject<O, NPlusOne>
  : `${NPlusOne}` extends keyof O ? _LeadingNonvariadicLengthOfListObject<O, NPlusOne>
  : NPlusOne

/**
 * coerces an array type into an object.
 * this can be useful for then e.g. detecting optional arguments in the parameters of a function
 * 
 * @since 0.0.2
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
 * type e4 = AsObject<[string, number, object?, ...boolean[]]> // { [x: number]: boolean, 0: string, 1: number, 2?: object | undefined } // optionality is preserved (and TypeScript converts `T?` to `(T | undefined)?`)
 */
export type AsObject<L extends List> =
  ShallowResolve<
    If<
      IsVariadic<L>,  
      Omit<L, keyof any[]> extends infer X
        ? { [x: number]: ElementOf<Slice<L, _LeadingNonvariadicLengthOfListObject<X>>> } & X
        : Unreachable,
      Omit<L, keyof any[]>
    >  
  >
