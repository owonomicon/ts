import { Relation } from "../type/relates"
import { Pick } from "./pick"
import { SelectKeys, SelectKeysByValue } from "./select-keys"

/**
 * picks all properties of `T` whose keys relate to `Q` by relation `R`
 */
export type PickSelectByKeys<T, Q, R extends Relation = 'extends'> =
  Pick<
    T,
    SelectKeys<T, Q, R>
  >

/**
 * picks all properties of `T` whose values relate to `Q` by relation `R`
 */
export type PickSelectByValues<T, Q, R extends Relation = 'extends'> =
  Pick<
    T,
    SelectKeysByValue<T, Q, R>
  >