import { If } from "../boolean"
import { Relates, Relation } from "../type"

/**
 * @since 0.0.2
 */
export type SelectKeys<T, Q, R extends Relation = 'extends'> =
  {
    [K in keyof T]-?:
      If<
        Relates<K, Q, R>,
        K
      >
  }[keyof T]

/**
 * @since 0.0.2
 */
export type SelectKeysByValue<T, Q, R extends Relation = 'extends'> =
  {
    [K in keyof T]-?:
      If<
        Relates<T[K], Q, R>,
        K
      >
  }[keyof T]