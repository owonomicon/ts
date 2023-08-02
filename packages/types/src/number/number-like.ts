/**
 * types that can be represented as a number string
 * 
 * @since 0.0.6
 */
export type NumberLikeSerializable =
  | number
  | bigint
  | `${number}`
  | `${bigint}`