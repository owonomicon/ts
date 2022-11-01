/**
 * type union of object keys
 */
export type Key =
  | string
  | number
  | symbol

export type NumericKey =
  | number
  | `${number}`