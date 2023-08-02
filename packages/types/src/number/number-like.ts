/**
 * types that can be represented as a number string
 */
export type NumberLikeSerializable =
  | number
  | bigint
  | `${number}`
  | `${bigint}`