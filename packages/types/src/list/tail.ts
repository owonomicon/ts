import { List, IsEmpty } from "."

/**
 * extracts the tail of list `L`.
 * If `L` is empty, resolves to the empty list `[]`
 */
export type Tail<L extends List> =
  IsEmpty<L> extends true ? []
  : L extends readonly [any, ...infer T] ? T
  : L extends readonly [...any, any] ? L
  : L extends readonly [any?, ...infer T] ? T
  : [] // should be unreachable
