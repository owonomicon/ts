import { List } from "."

/**
 * @since 0.0.2
 */
export type Concat<L1 extends List, L2 extends List> =
  [...L1, ...L2]