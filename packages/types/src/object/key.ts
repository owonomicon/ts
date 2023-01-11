/**
 * type union of object keys
 */
export type Key =
  keyof any
  // | string
  // | number
  // | symbol

export type NumericKey =
  | number
  | `${number}`