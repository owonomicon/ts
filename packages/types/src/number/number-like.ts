/**
 * types that can be represented as a number string
 * 
 * @remarks
 * 
 * many existing apis may only expect `string` or `number` types.
 * as such, by default, `NumberLikeSerializable` does _not_ include `bigint`s.
 * to include `bigint`, pass it in as a generic, i.e. `NumberLikeSerializable<bigint>` 
 * 
 * @since 0.0.6
 */
export type NumberLikeSerializable<Bigint extends bigint = never> =
  | number
  | `${number}`
  | Bigint
  | `${Bigint}` // `\`${never}\`` resolves to `never`