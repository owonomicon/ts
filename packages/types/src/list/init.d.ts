import { Append, AppendOptional } from "./append";
import { Concat } from "./concat";
import { Length } from "./length";
import { List } from "./list";

type _Init<L extends List, Acc extends unknown[] = []> =
  Length<L> extends 0 ? Acc
  : L extends readonly [any?] ? Acc
  : L extends readonly [infer H, ...infer T] ? _Init<T, Append<Acc, H>>
  : L extends readonly [...infer I, any] ? Concat<Acc, I>
  : L extends { 0?: any } ?
    L extends readonly [_?: infer H, ...__: infer T]
      ? _Init<T, AppendOptional<Acc, H>>
      : Concat<Acc, L>
  : Concat<Acc, L>

/**
 * gets all elements of list `L` except the last one.
 * 
 * if `L` is empty, returns an empty list.
 * 
 * @example
 * type e0 = Init<never>                          // []
 * type e1 = Init<[]>                             // []
 * type e2 = Init<[string]>                       // []
 * type e3 = Init<string[]>                       // string[]
 * type e4 = Init<[...string[], number]>          // string[]
 * type e5 = Init<[string, ...number[]]>          // [string, ...number]
 * type e6 = Init<[string, ...number[], boolean]> // [string, ...number]
 * type e7 = Init<[string?]>                      // []
 * type e8 = Init<[string?, ...number[]]>         // [(string | undefined)?, ...number[]]
 */
export type Init<L extends List> =
  _Init<L>