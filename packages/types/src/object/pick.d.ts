import type { Equals } from "../_meta/equals"
import type { If } from "../bool/if"
import { IsNever } from "../any/is-never"
import { Select } from "../union/select"
import { OptionalKeys, RequiredKeys } from "./keys"
import { Relation } from "../_meta/relates"
import { Not } from "../bool/not"
import { Extends } from "../_meta/extends"

/**
 * picks the properties of `T` that don't have a type of `never` for their value
 */
export type PickNonNever<T> = Pick<T,
  {
    [K in keyof T]:
      If<
        IsNever<T[K]>,
        never,
        K
      >
  }[keyof T]
>

/**
 * Picks the mutable (i.e. non-readonly) properties of `T`.
 */
export type PickMutable<T> =
  {
    [K in keyof T as
      If<
        Equals<
          { [U in K]: T[K] },
          { -readonly [U in K]: T[K] }
        >,
        K
      >
    ]: T[K]
  }

/**
 * Picks the readonly properties of `T`.
 */
export type PickReadonly<T> =
  {
    [K in keyof T as
      If<
        Not<Equals<
          { [U in K]: T[K] },
          { -readonly [U in K]: T[K] }
        >>,
        K
      >
    ]: T[K]
  }

/**
 * Picks the optional properties of `T`
 */
export type PickOptional<T> = Pick<T, OptionalKeys<T>>

/**
 * picks the required properties of `T`
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>

/**
 * picks all properties of `T` whose keys relate to `Q` by relation `R`
 */
export type PickSelect<T, Q, R extends Relation = 'extends'> =
  {
    [K in keyof T as
      If<
        Extends<K, Select<K, Q, R>>,
        K
      >
    ]: T[K]
  }
