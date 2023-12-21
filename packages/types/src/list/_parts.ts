import {
  IsTuple,
  IsVariadic,
  List,
} from "."
import { Unreachable } from "../type"

/**
 * gets the spread and tail parts of a list with a leading spread.
 * 
 * `Acc` accumulates the tail of `L` as `__Parts` recurses on itself.
 * when the tail is fully accumulated, then `L` will consist of only the spread element,
 * so `L` and `Acc` are returned in a tuple corresponding to the spread and tail.
 */
type __Parts<L extends List, Acc extends List = []> =
  L extends readonly [...infer Init, infer Last]
    // preserve labels
    ? L extends [...Init, ...infer Last extends [any]]
      ? __Parts<Init, [...Last, ...Acc]>
      : Unreachable
    : [spread: L, tail: Acc]

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
  L extends readonly [infer H, ...infer T]
    // preserve labels
    ? L extends [...infer H extends [any], ...any]
      ? _Parts<T, [...Acc, ...H]>
      : Unreachable
  : L extends readonly [...any, any] ? [init: Acc, ...__Parts<L>] 
  : L extends { 0?: any } ?
    L extends readonly [_?: infer H, ...__: infer T]
      // preserve labels
      ? L extends [...infer H extends [any?], ...any]
        ? _Parts<T, [...Acc, ...H]>
        : Unreachable
      : [init: Acc, spread: L, tail: []]
  : [init: Acc, spread: L, tail: []]

/**
 * splits a list into its constituent parts `[init, spread, tail]`, where:
 * - `init` is a list of the elements before the spread element
 * - `spread` is the spread element
 * - `tail` is a list of the elements following the spread element
 * 
 * labels in `L` are preserved (ts5.2+).
 * the exception to this is the spread element, which loses its label (if it had any).
 * this is because `[...foo: bar[]]` automatically reduces to `bar[]` (last checked: ts5.3.3)
 * 
 * @time_complexity
 * - O(1) on plain lists
 * - O(1) on nonvariadic tuples
 * - O(n) on variadic tuples
 * 
 * @undefined_behavior `L` is `never`
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * type e0 = Parts<[]>                                            // [init: [], spread: [], tail: []]
 * type e1 = Parts<[string]>                                      // [init: [string], spread: [], tail: []]
 * type e2 = Parts<[string, number]>                              // [init: [string, number], spread: [], tail: []]
 * type e3 = Parts<string[]>                                      // [init: [], spread: string[], tail: []]
 * type e4 = Parts<[...foo: string[], bar: number]>               // [init: [], spread: string[], tail: [bar: number]]
 * type e5 = Parts<[string, ...number[]]>                         // [init: [string], spread: number[]]
 * type e6 = Parts<[foo: string, ...bar: number[], baz: boolean]> // [init: [foo: string], spread: number[], tail: [baz: boolean]]
 * type e7 = Parts<[string?]>                                     // [init: [string?], spread: [], tail: []]
 * type e8 = Parts<[string?, foo?: number, ...boolean[]]>         // [init: [string?, foo?: number], spread: number[], tail: []]
 * ```
 */
export type Parts<L extends List> =
  IsTuple<L> extends true
    ? IsVariadic<L> extends true
      ? _Parts<L>
      : [init: L, spread: [], tail: []]
    : [init: [], spread: L, tail: []]