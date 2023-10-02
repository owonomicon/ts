import { Unreachable } from "../../type"
import { PadLeadingZeros } from "../string"
import { _IncNonneg } from "."

/**
 * finds the longer length of integer strings `S1`, `S2`
 */
 type MaxLen<S1 extends string, S2 extends string, N extends number = 0> =
 S1 extends `${number}${infer T1}`
   ? S2 extends `${number}${infer T2}`
     ? MaxLen<T1, T2, _IncNonneg<N>>
     : MaxLen<T1, '', _IncNonneg<N>>
   : S2 extends `${number}${infer T2}`
     ? MaxLen<'', T2, _IncNonneg<N>>
     : N

/**
 * converts integers `N1`, `N2` into equal-length strings by padding the shorter with leading zeros
 * 
 * used for `Add` and `Sub`
 * 
 * @since 0.0.2
 * 
 * @private
 * @ignore
 */
export type _PadZeros<N1 extends number, N2 extends number> =
 [`${N1}`, `${N2}`] extends [infer S1 extends string, infer S2 extends string]
   ? MaxLen<S1, S2> extends (infer N extends number)
     ? [PadLeadingZeros<S1, N>, PadLeadingZeros<S2, N>]
     : Unreachable
   : Unreachable