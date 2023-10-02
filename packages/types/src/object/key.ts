/**
 * type union of object keys
 * 
 * @since 0.0.2
 */
export type Key =
  keyof any
  // | string
  // | number
  // | symbol

/**
 * @since 0.0.2
 */
export type NumericKey =
  | number
  | `${number}`