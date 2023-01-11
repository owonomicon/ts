import { Append, AppendOptional } from "./append"
import { List } from "./list"
import { Prepend } from "./prepend"

/**
 * gets the spread and tail parts of a list with a leading spread.
 * 
 * `Acc` accumulates the tail of `L` as `__Parts` recurses on itself.
 * when the tail is fully accumulated, then `L` will consist of only the spread element,
 * so `L` and `Acc` are returned in a tuple corresponding to the spread and tail.
 */
type __Parts<L extends List, Acc extends List = []> =
  L extends readonly [...infer Init, infer Last]
    ? __Parts<Init, Prepend<Acc, Last>>
    : [L, Acc]

/**
 * gets the three distinct parts of a list consisting of
 *  the "Init" (elements before the spread element),
 *  the "Spread" (the spread element),
 *  and the "Tail" (elements following the spread element).
 * 
 * `Acc` accumulates the Init of `L` as `_Parts` recurses on itself.
 * when the spread element is encountered, the Init is done, and finding the Spread and Tail is delegated to `__Parts`.
 * if no spread element was encountered in the entire list, then the Spread and Tail are trivially empty lists. 
 */
type _Parts<L extends List, Acc extends List = []> =
  L extends readonly [infer H, ...infer T] ? _Parts<T, Append<Acc, H>>
  : L extends readonly [...any, any] ? [Acc, ...__Parts<L>] 
  : L extends { 0?: any } ?
    L extends readonly [_?: infer H, ...__: infer T]
      ? _Parts<T, AppendOptional<Acc, H>>
      : [Acc, L, []]
  : [Acc, L, []]

/**
 * splits a list into its constituent parts `[Init, Spread, Tail]`, where:
 * - `Init` is a list of the elements before the spread element
 * - `Spread` is the spread element
 * - `Tail` is a list of the elements following the spread element
 * 
 * @example
 * 
 * type e0 = Parts<never>                           // never
 * type e1 = Parts<[]>                              // [[], [], []]
 * type e2 = Parts<[string]>                        // [[string], [], []]
 * type e3 = Parts<[string, number]>                // [[string, number], [], []]
 * type e4 = Parts<string[]>                        // [[], string[], []]
 * type e5 = Parts<[...string[], number]>           // [[], string[], number]
 * type e6 = Parts<[string, ...number[]]>           // [[string], number[]]
 * type e7 = Parts<[string, ...number[], boolean]>  // [[string], number[], [boolean]]
 * type e8 = Parts<[string?]>                       // [[string?], [], []]
 * type e9 = Parts<[string?, ...number[]]>          // [[string?], number[], []]
 */
export type Parts<L extends List> =
  _Parts<L>
