import { Exclude } from "../set/exclude"

/**
 * union type of nullish values.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 */
export type Nullish =
  | null
  | undefined

/**
 * type representing a possibly nullish value
 */
export type Nullishable<T> = T | Nullish

/**
 * type representing a possibly undefined value
 */
export type Undefinable<T> = T | undefined

/**
 * type representing a possibly null value
 */
export type Nullable<T> = T | null

/**
 * type representing a nonnullish value
 */
export type NonNullish<T> = Exclude<T, Nullish>
/**
 * type representing a nonundefined value
 */
export type NonUndefined<T> = Exclude<T, undefined>
/**
 * type representing a nonnull value
 */
export type NonNull<T> = Exclude<T, null>