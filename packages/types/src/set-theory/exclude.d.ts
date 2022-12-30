import { Select } from "./select"
import { Relation } from "../type/relates"

/**
 * exclude from union `U` the types that relate to query `Q` by relation `R`
 */
export type Exclude<U, Q, R extends Relation = 'extends'> =
  U extends Select<U, Q, R>
    ? never
    : U