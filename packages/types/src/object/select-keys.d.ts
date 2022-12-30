import { If } from "../bool/if"
import { Relates, Relation } from "../type/relates"

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