import { If } from "../bool/if"
import { ElementOf } from "../list/element-of"
import { IsEmpty } from "../list/is-empty"
import { List } from "../list/list"
import { Pairs } from "../list/pairs"
import { Reverse } from "../list/reverse"
import { Length as _Length } from "../string/length"
import { Reverse as _Reverse } from "../string/reverse"
import { StartsWith as _StartsWith } from "../string/starts-with"
import { Extends } from "../_meta/extends"
import { Satisfies } from "../_meta/satisfies"
import { $ } from "./$"
import { $All } from "./list/all"

export interface HKT<I = unknown, O = unknown> {
  readonly [HKT._]: unknown
  [HKT.i]: I
  [HKT.o]: O
}

export namespace HKT {
  const _: unique symbol
  type _ = typeof _
  
  const i: unique symbol
  type i = typeof i

  const o: unique symbol
  type o = typeof o

  type I<Kind extends HKT> = Kind[HKT.i]
  type O<Kind extends HKT> = Kind[HKT.o]
}

export type I<Kind extends HKT> = HKT.I<Kind>
export type O<Kind extends HKT> = HKT.O<Kind>