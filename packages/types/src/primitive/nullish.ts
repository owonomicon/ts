import { Exclude } from "../set"

/**
 * union type of nullish values.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 * 
 * @since 0.0.2
 */
export type Nullish =
  | null
  | undefined

/**
 * type representing a possibly nullish value
 * 
 * @since 0.0.2
 */
export type Nullishable<T> = T | Nullish

/**
 * type representing a possibly undefined value
 * 
 * @since 0.0.2
 */
export type Undefinable<T> = T | undefined

/**
 * type representing a possibly null value
 * 
 * @since 0.0.2
 */
export type Nullable<T> = T | null

/**
 * type representing a nonnullish value
 * 
 * @since 0.0.2
 */
export type NonNullish<T> = Exclude<T, Nullish>
/**
 * type representing a nonundefined value
 * 
 * @since 0.0.2
 */
export type NonUndefined<T> = Exclude<T, undefined>
/**
 * type representing a nonnull value
 * 
 * @since 0.0.2
 */
export type NonNull<T> = Exclude<T, null>