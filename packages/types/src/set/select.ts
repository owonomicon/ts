import { If } from "../boolean"
import { Relates, Relation } from "../type"

/**
 * select from union type `U` the types that relate to query `Q` by relation `R`
 * 
 * @since 0.0.2
 */
export type Select<U, Q, R extends Relation = 'extends'> =
  If<
    Relates<U, Q, R>,
    U & Q
  >