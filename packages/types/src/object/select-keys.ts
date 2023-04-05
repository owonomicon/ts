import { If } from "../boolean"
import { Relates, Relation } from "../type"

export type SelectKeys<T, Q, R extends Relation = 'extends'> =
  {
    [K in keyof T]-?:
      If<
        Relates<K, Q, R>,
        K
      >
  }[keyof T]

export type SelectKeysByValue<T, Q, R extends Relation = 'extends'> =
  {
    [K in keyof T]-?:
      If<
        Relates<T[K], Q, R>,
        K
      >
  }[keyof T]