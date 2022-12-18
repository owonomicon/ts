import { Extends } from "../../type/extends"
import { IsNever } from "../../type/is-never"
import { If } from "../../bool/if"
import { Or } from "../../bool/or"
import { Serializable } from "../../string/serializable"
import { IsFractional } from "../is-fractional"
import { IsNegative } from "../is-negative"

declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<M extends string> = { [TS_TYPE_ERROR]: M }

export type ValidatePosInt<N, Name extends Serializable = never> =
  If<
    Or<
      Or<
        IsFractional<N & number>,
        IsNegative<N & number>
      >,
      Extends<N, 0>
    >,
    TS_TYPE_ERROR<
      N extends Serializable
        ? `expected a positive integer but found \`${N}\``
        : `${IsNever<Name> extends true ? 'N' : Name} must be a positive integer`
    >,
    number
  >

export type ValidateNonnegInt<N, Name extends Serializable = never> =
  If<
    Or<
      IsFractional<N & number>,
      IsNegative<N & number>
    >,
    TS_TYPE_ERROR<
      N extends Serializable
        ? `expected a nonnegative integer but found \`${N}\``
        : `${IsNever<Name> extends true ? 'N' : Name} must be a nonnegative integer`
    >,
    number
  >

export type ValidateInt<N, Name extends Serializable = never> =
  If<
    IsFractional<N & number>,
    TS_TYPE_ERROR<
      N extends Serializable
        ? `expected an integer but found \`${N}\``
        : `${IsNever<Name> extends true ? 'N' : Name} must be an integer`
    >,
    number
  >