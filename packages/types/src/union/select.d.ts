import { If } from "../bool/if"
import { Relates, Relation } from "../_meta/relates"

/**
 * select from union type `U` the types that relate to query `Q` by relation `R`
 */
export type Select<U, Q, R extends Relation = 'extends'> =
  If<
    Relates<U, Q, R>,
    U & Q
  >