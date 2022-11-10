import { Length } from "./length";
import { List } from "./list";

/**
 * gets the last element of list `L`.
 * 
 * if `L` is empty, resolves to `never`.
 * 
 * @example
 * type e0 = Last<never>                          // never
 * type e1 = Last<[]>                             // never
 * type e2 = Last<[string]>                       // string
 * type e3 = Last<string[]>                       // string
 * type e4 = Last<[...string[], number]>          // number
 * type e5 = Last<[string, ...number[]]>          // number
 * type e6 = Last<[string, ...number[], boolean]> // boolean
 * type e7 = Last<[string?]>                      // string
 * type e8 = Last<[string?, ...number[]]>         // number
 */
export type Last<L extends List> =
  Length<L> extends 0 ? never
  : L extends [_?: infer X] ? X
  : L extends [any, ...infer T] ? Last<T>
  : L extends [...any, infer X] ? X
  : L extends { 0?: any} ?
    L extends [any?, ...infer T]
      ? Last<T>
      : L[number]
  : L[number]
