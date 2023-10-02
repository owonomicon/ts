import { Relation } from "../type"
import { Pick, SelectKeys, SelectKeysByValue } from "."

/**
 * picks all properties of `T` whose keys relate to `Q` by relation `R`
 * 
 * @since 0.0.2
 */
export type PickSelectByKeys<T, Q, R extends Relation = 'extends'> =
  Pick<
    T,
    SelectKeys<T, Q, R>
  >

/**
 * picks all properties of `T` whose values relate to `Q` by relation `R`
 * 
 * @since 0.0.2
 */
export type PickSelectByValues<T, Q, R extends Relation = 'extends'> =
  Pick<
    T,
    SelectKeysByValue<T, Q, R>
  >