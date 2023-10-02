/**
 * types that can be serialized (i.e. used in a template literal).
 * 
 * "Type '[insert type here]' is not assignable to type 'string | number | bigint | boolean | null | undefined'.ts(2322)"
 * 
 * @since 0.0.2
 */
export type Serializable =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined