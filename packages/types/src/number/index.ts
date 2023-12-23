import * as Int from "./int"
export * as Int from "./int"

import * as String from "./string"
export * as String from "./string"

import * as abs from "./abs"
export * from "./abs"
import * as digit from "./digit"
export * from "./digit"
import * as is_fractional from "./is-fractional"
export * from "./is-fractional"
import * as is_literal from "./is-literal"
export * from "./is-literal"
import * as is_negative from "./is-negative"
export * from "./is-negative"
import * as is_number from "./is-number"
export * from "./is-number"
import * as negate from "./negate"
export * from "./negate"
import * as number_like from "./number-like"
export * from "./number-like"
import * as range from "./range"
export * from "./range"

export default {
  Int,
  String,
  
  ...abs,
  ...digit,
  ...is_fractional,
  ...is_literal,
  ...is_negative,
  ...is_number,
  ...negate,
  ...number_like,
  ...range,
}