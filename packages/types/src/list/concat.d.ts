import { List } from "./list";

export type Concat<L1 extends List, L2 extends List> =
  [...L1, ...L2]