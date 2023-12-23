import { If, Not } from "../../boolean"
import { Serializable } from "../../string"
import {
    Extends,
    IsNever,
    Unreachable,
} from "../../type"
import { IsFractional, IsNegative } from ".."

declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<M extends string> = { [TS_TYPE_ERROR]: M }

type ResolveName<S extends Serializable> =
  IsNever<S> extends true
    ? 'N'
    : S

/**
 * @since 0.0.2
 */
export type ValidatePosInt<N, Name extends Serializable = never> =
  If<
    IsNever<N>,
    TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found \`never\``>,
    If<
      Not<Extends.Nondistributive<N, number>>,
      TS_TYPE_ERROR<
        N extends Serializable
          ? `expected a positive integer for ${ResolveName<Name>} but found non-number type \`${N}\``
          : `expected a positive integer for ${ResolveName<Name>} but a non-number type was provided`
      >,
      [N] extends [infer N extends number]
        ? If<
            Extends<number, N>,
            TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found \`number\`. ${ResolveName<Name>} must be a number literal`>,
            If<
              IsFractional<N>,
              TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found non-integer number \`${N}\``>,
              If<
                IsNegative<N>,
                TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found negative integer \`${N}\``>,
                If<
                  Extends<N, 0>,
                  TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found \`0\`. 0 is not a positive integer`>,
                  number
                >
              >
            >
          >
        : Unreachable
    >
  >

/**
 * @since 0.0.2
 */
export type ValidateNonnegInt<N, Name extends Serializable = never> =
  If<
    IsNever<N>,
    TS_TYPE_ERROR<`expected a nonnegative integer for ${ResolveName<Name>} but found \`never\``>,
    If<
      Not<Extends.Nondistributive<N, number>>,
      TS_TYPE_ERROR<
        N extends Serializable
          ? `expected a nonnegative integer for ${ResolveName<Name>} but found non-number type \`${N}\``
          : `expected a nonnegative integer for ${ResolveName<Name>} but a non-number type was provided`
      >,
      [N] extends [infer N extends number]
        ? If<
            Extends<number, N>,
            TS_TYPE_ERROR<`expected a nonnegative integer for ${ResolveName<Name>} but found \`number\`. ${ResolveName<Name>} must be a number literal`>,
            If<
              IsFractional<N>,
              TS_TYPE_ERROR<`expected a nonnegative integer for ${ResolveName<Name>} but found non-integer number \`${N}\``>,
              If<
                IsNegative<N>,
                TS_TYPE_ERROR<`expected a nonnegative integer for ${ResolveName<Name>} but found negative integer \`${N}\``>,
                number
              >
            >
          >
        : Unreachable
    >
  >

/**
 * @since 0.0.2
 */
export type ValidateInt<N, Name extends Serializable = never> =
  If<
    IsNever<N>,
    TS_TYPE_ERROR<`expected an integer for ${ResolveName<Name>} but found \`never\``>,
    If<
      Not<Extends.Nondistributive<N, number>>,
      TS_TYPE_ERROR<
        N extends Serializable
          ? `expected an integer for ${ResolveName<Name>} but found non-number type \`${N}\``
          : `expected an integer for ${ResolveName<Name>} but a non-number type was provided`
      >,
      [N] extends [infer N extends number]
        ? If<
            Extends<number, N>,
            TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found \`number\`. ${ResolveName<Name>} must be a number literal`>,
            If<
              IsFractional<N>,
              TS_TYPE_ERROR<`expected a positive integer for ${ResolveName<Name>} but found non-integer number \`${N}\``>,
              number
            >
          >
        : Unreachable
    >
  >
