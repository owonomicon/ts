import { Relates, Relation } from "../type/relates";
import { Append, AppendOptional } from "./append";
import { Concat } from "./concat";
import { ElementOf } from "./element-of";
import { IsEmpty } from "./is-empty";
import { List } from "./list";
import { Prepend } from "./prepend";

/**
 * tail call optimized type to filter variadic tuple with leading spread `L`.
 * filters from the end of the list until only the spread remains, then applies the filter to the spread.
 */
type __Filter<L extends List, Q, R extends Relation, Acc extends unknown[] = []> =
  // still have trailing non-spread elements
  L extends readonly [...infer Spread, infer Last]
    ? Relates<Last, Q, R> extends true
      ? __Filter<Spread, Q, R, Prepend<Acc, Last>>
      : __Filter<Spread, Q, R, Acc>
  // only spread element is left
  : Relates<ElementOf<L>, Q, R> extends true
    ? Concat<L, Acc>
    : Acc
    
/**
 * tail call optimized type to filter a list.
 * properly handles variadic tuples and optional elements.
 */
type _Filter<L extends List, Q, R extends Relation, Acc extends unknown[] = []> =
  IsEmpty<L> extends true ? Acc
  : L extends readonly [infer H, ...infer T]
    ? Relates<H, Q, R> extends true
      ? _Filter<T, Q, R, Append<Acc, H>>
      : _Filter<T, Q, R, Acc>
  : L extends readonly [...any, any]
    ? Concat<Acc, __Filter<L, Q, R>>
  : L extends { 0?: any }
      ? L extends readonly [_?: infer H, ...__: infer T]
        ? Relates<H, Q, R> extends true
          ? _Filter<T, Q, R, AppendOptional<Acc, H>>
          : _Filter<T, Q, R, Acc>
      : Relates<ElementOf<L>, Q, R> extends true
        ? Concat<Acc, L>
        : Acc
  : Relates<ElementOf<L>, Q, R> extends true
    ? Concat<Acc, L>
    : Acc

/**
 * filters from list `L` only the elements that relate to `Q` by relation `R`.
 * properly handles variadic tuples.
 * 
 * @example
 * type e0 = Filter<string[], string> // string[]
 * type e1 = Filter<string[], number> // []
 * type e2 = Filter<['foo', 'bar', null, 'baz', null, null], string> // ['foo', 'bar', 'baz']
 * type e3 = Filter<[string, number, ...string[], number], string> // [string, ...string[]]
 * type e4 = Filter<[...string[], number, string, number], string> // [...string[], string]
 * type e5 = Filter<['foo', 'bar', 'baz', null, 'qux'?], string> // ['foo', 'bar', 'baz', ('qux' | undefined)?]
 * 
 * // tail call optimized so works on very large tuples. below is a 512 length tuple
 * type t6 = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
 * type e6 = Filter<t6, 0> // not gonna write it out, but it works fine with no error
 * 
 */
export type Filter<L extends List, Q, R extends Relation = 'extends'> =
  _Filter<L, Q, R>
