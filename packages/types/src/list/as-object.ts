import { If } from "../boolean"
import { _IncNonneg } from "../number/int"
import { Omit } from "../object"
import { ShallowResolve, Unreachable } from "../type"
import { ElementOf, IsVariadic, List, Slice } from "."

/**
 * get the "length" of the resultant named object from a list
 */
type _AsObject<L extends List, Named, N extends number = 0> =
  _IncNonneg<N> extends (infer N extends number)
    ? N extends keyof Named ? _AsObject<L, Named, N>
      : `${N}` extends keyof Named ? _AsObject<L, Named, N>
      : N
    : Unreachable

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
 * type e4 = AsObject<[string, number, object?, ...boolean[]]> // { [x: number]: boolean, 0: string, 1: number, 2?: object | undefined } // optionality is preserved (and TypeScript converts `T?` to `(T | undefined)?`)
 */
export type AsObject<L extends List> =
  ShallowResolve<
    If<
      IsVariadic<L>,  
      Omit<L, keyof any[]> extends infer X
        ? { [x: number]: ElementOf<Slice<L, _AsObject<L, X>>> } & X
        : Unreachable,
      Omit<L, keyof any[]>
    >  
  >
