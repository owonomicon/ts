import { Unreachable } from "../../_meta/unreachable"
import { PadLeadingZeros } from "../string/pad-leading-zeros"
import { __nomicon_unsafe__NonnegInc } from "./inc"

/**
 * finds the longer length of integer strings `S1`, `S2`
 */
 type MaxLen<S1 extends string, S2 extends string, N extends number = 0> =
 S1 extends `${number}${infer T1}`
   ? S2 extends `${number}${infer T2}`
     ? MaxLen<T1, T2, __nomicon_unsafe__NonnegInc<N>>
     : MaxLen<T1, '', __nomicon_unsafe__NonnegInc<N>>
   : S2 extends `${number}${infer T2}`
     ? MaxLen<'', T2, __nomicon_unsafe__NonnegInc<N>>
     : N

/**
 * converts integers `N1`, `N2` into equal-length strings by padding the shorter with leading zeros
 * 
 * used for `Add` and `Sub`
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