import { Satisfies, Unreachable } from "../../type"
import { Fold } from "../list"
import { $, HKT, _, I } from ".."

type EMPTY_STRING = ''

interface Joiner<Sep extends string> extends HKT {
  [HKT.i]: Satisfies<_<this>, [acc: string, cur: string]>
  [HKT.o]:
    I<this> extends [infer Acc extends string, infer Cur extends string]
      ? Acc extends EMPTY_STRING
        ? `${Cur}`
        : `${Acc}${Sep}${Cur}`
      : Unreachable 
}

/**
 * joins a list of strings with a separator
 * 
 * @since 0.0.5
 */
export interface Join<Sep extends string> extends HKT {
  [HKT.i]: Satisfies<_<this>, readonly string[]>
  [HKT.o]: $<Fold<Joiner<Sep>, EMPTY_STRING>, I<this>>
}