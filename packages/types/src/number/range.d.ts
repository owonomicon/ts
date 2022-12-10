/**
 * types for defining a range of positive integers
 * track the proposal for a built-in at https://github.com/microsoft/TypeScript/issues/43505
 */

import { Satisfies } from "../_meta/satisfies"
import { List } from "../list/list"
import { Length } from "../list/length"
import { Exclude } from "../set-theory/exclude"
import { Unreachable } from "../_meta/unreachable"

/**
 * generator.
 * builds up an array containing elements of the numbers 0 up to but excluding N
 */
type _RangeTuple<N extends number, A extends number[] = []> =
  Length<A> extends N
    ? A
    : _RangeTuple<N, [...A, Length<A>]>

/**
 * enumeration of integers from `0` to `N`, exclusive. i.e. the range [0, N)
 */
export type Enumerate<N extends number> =
   _RangeTuple<N> extends infer A
      ? Satisfies<A, List>[number] // we know that _RangeTuple will always return a tuple (i.e. will always be list-like) so we just coerce here
      : Unreachable

/**
 * range of integers from `Start` to `End - 1`, inclusive. i.e. the range [Start, End)
 */
export type Range<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>>