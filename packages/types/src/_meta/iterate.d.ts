/**
 * TODO: it's kinda unwieldy in having to unwrap and rewrap `Iteration` / use extends + infer to extract the contents.
 * maybe there's some way to make `Iteration` monadic? and the `Opaque` type as well while we're at it?
 * also it's annoying to have to do `extends Iteration = Iterate<0>` or whatever in that the types `Iteration` and `Iterate` are different
 */

import { Append } from "../list/append";
import { Length } from "../list/length";
import { Tail } from "../list/tail";

declare const __ITERATION__: unique symbol;

type _Iteration<T extends any[] = any[]> = { readonly [__ITERATION__]: T }

export type Iteration = _Iteration<any[]>

type _Iterate<N extends number, A extends any[] = []> =
  Length<A> extends N
    ? A
    : _Iterate<N, Append<A, any>>

export type Iterate<N extends number = number> = _Iteration<_Iterate<N>>

export type Increment<I extends Iteration> = I extends _Iteration<infer N>
  ? _Iteration<Append<N, any>>
  : never

export type Decrement<I extends Iteration> = I extends _Iteration<infer N>
  ? _Iteration<Tail<N>>
  : never

export type IsZero<I extends Iteration> =
  Value<I> extends 0
    ? 1
    : 0
  
export type Value<I extends Iteration> = I extends _Iteration<infer N>
  ? Length<N>
  : never

type a = Increment<Iterate<4>>
type b = Value<Decrement<Iterate<4>>>