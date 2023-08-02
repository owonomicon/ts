import { And } from "../../../boolean"
import { IsEmpty } from "../../../list"
import { Unreachable } from "../../../type"
import * as Digit from ".."
import * as DL from "."

type BitOr<B1 extends 0 | 1, B2 extends 0 | 1> = [
  [0, 1],
  [1, 1],
][B1][B2]

type _Add<
  L1 extends DL.DigitList,
  L2 extends DL.DigitList,
  Carry extends Digit.DigitCarry = 0,
  Acc extends DL.DigitList = [],
> =
  // check if finished
  And<IsEmpty<L1>, IsEmpty<L2>> extends false

    /**
     * 1. extract the least significant digit
     * 
     *   a b c
     * +     d
     *   -----
     *          -> [c, d]
     */
    ? [DL.Last<L1>, DL.Last<L2>] extends [infer D1 extends Digit.Digit, infer D2 extends Digit.Digit]

      /**
       * 2. get the ones and tens result of adding the digits
       * 
       *   a b c
       * +     d
       *   -----
       *          -> [(c + d) % 10, (c + d) / 10]. let's refer to this as [s1, c1] (SumOnes, SumTens in the types)
       */ 
      ? [Digit.AddOnes<D1, D2>, Digit.AddTens<D1, D2>] extends [infer SumOnes extends Digit.Digit, infer SumTens extends Digit.DigitCarry]

        /**
         * 3. add the carry to our sum to get the final sum.
         * 
         * our final result is:
         * 
         *   a b c
         * +     d
         *   -----
         *          -> [(s1 + carry) % 10, (s1 + carry) / 10]. let's refer to this as [s2, c2] (SumCarryOnes, SumCarryTens in the types)
         * 
         * so then our resultant digit from adding is `s2`,
         * and our resultant carry is `c1 | c2`
         */
        ? [Digit.AddOnes<SumOnes, Carry>, Digit.AddTens<SumOnes, Carry>] extends [infer SumCarryOnes extends Digit.Digit, infer SumCarryTens extends Digit.DigitCarry]
          ? _Add<
              DL.Init<L1>, DL.Init<L2>,
              BitOr<SumTens, SumCarryTens>,
              [SumCarryOnes, ...Acc]
            >
          : Unreachable
        : Unreachable
      : Unreachable
    : Carry extends 1
      ? [1, ...Acc]
      : Acc

/**
 * @since 0.0.6
 */
export type Add<N1 extends DL.DigitList, N2 extends DL.DigitList> =
  _Add<N1, N2>