import { If } from "../boolean/if"
import { Relates, Relation } from "../type/relates"

/**
 * select from union type `U` the types that relate to query `Q` by relation `R`
 */
export type Select<U, Q, R extends Relation = 'extends'> =
  If<
    Relates<U, Q, R>,
    U & Q
  >