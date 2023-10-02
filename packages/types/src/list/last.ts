import { Length, List } from "."

/**
 * gets the last element of list `L`.
 * 
 * if `L` is empty, resolves to `never`.
 * 
 * @since 0.0.2
 * 
 * @example
 * type e0 = Last<never>                          // never
 * type e1 = Last<[]>                             // never
 * type e2 = Last<[string]>                       // string
 * type e3 = Last<string[]>                       // string
 * type e4 = Last<[...string[], number]>          // number
 * type e5 = Last<[string, ...number[]]>          // number
 * type e6 = Last<[string, ...number[], boolean]> // boolean
 * type e7 = Last<[string?]>                      // string | undefined
 * type e8 = Last<[string?, ...number[]]>         // number | string | undefined
 */
export type Last<L extends List> =
  _Last<L>

type _Last<L extends List, Previous = never> = 
  Length<L> extends 0 ? never
  : L extends readonly [_: infer T] ? T
  : L extends readonly [infer H, ...infer T] ? _Last<T, H>
  : L extends readonly [...any, infer X] ? X
  : L[number] | Previous