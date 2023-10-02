/**
 * types for defining a range of positive integers
 * track the proposal for a built-in at https://github.com/microsoft/TypeScript/issues/43505
 */

import { Append, Length, List } from "../list"
import { Exclude } from "../set"
import { Unreachable } from "../type"

/**
 * generator.
 * builds up an array containing elements of the numbers 0 up to but excluding N
 */
type _RangeTuple<N extends number, Acc extends number[] = []> =
  Length<Acc> extends N
    ? Acc
    : _RangeTuple<N, Append<Acc, Length<Acc>>>

/**
 * enumeration of integers from `0` to `N`, exclusive. i.e. the range [0, N)
 * 
 * @since 0.0.2
 */
export type Enumerate<N extends number> =
   _RangeTuple<N> extends (infer L extends List)
      ? L[number]
      : Unreachable

/**
 * range of integers from `Start` to `End - 1`, inclusive. i.e. the range [Start, End)
 * 
 * @since 0.0.2
 */
export type Range<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>>