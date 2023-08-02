import { IsDigitString } from "./is-digit-string"

declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<Message extends string> = { [TS_TYPE_ERROR]: Message }

/**
 * @since 0.0.6
 */
export type DigitString<S> =
  [S] extends [string]
    ? IsDigitString<S> extends true
      ? string
      : S extends ''
        ? TS_TYPE_ERROR<"expected a digit string, but found empty string">
        : TS_TYPE_ERROR<"expected a digit string, but encountered a non-digit character">
    : TS_TYPE_ERROR<"expected a digit string, but found a non-string type">