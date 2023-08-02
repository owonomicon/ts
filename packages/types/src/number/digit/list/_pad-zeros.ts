import { IsVariadic, Length, List } from "../../../list"
import { Unreachable } from "../../../type"
import { DigitList } from "./digit-list"

type _MaxLen<L1 extends List, L2 extends List, O1, O2> =
  L1 extends readonly [any, ...infer T1]
    ? L2 extends readonly [any, ...infer T2]
      ? _MaxLen<T1, T2, O1, O2>
      : O1
    : O2
type MaxLen<L1 extends List, L2 extends List> =
  IsVariadic<L1> extends true ? number
  : IsVariadic<L2> extends true ? number
  : Length<_MaxLen<L1, L2, L1, L2>>

type FillLeft<L extends List, N extends number> =
  Length<L> extends N
    ? L
    : FillLeft<[0, ...L], N>

/**
 * @since 0.0.6
 */
export type _PadZeros<L1 extends DigitList, L2 extends DigitList> =
  MaxLen<L1, L2> extends (infer N extends number)
    ? [FillLeft<L1, N>, FillLeft<L2, N>]
    : Unreachable