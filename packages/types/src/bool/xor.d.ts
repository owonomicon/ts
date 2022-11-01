import { Bool } from "./bool";

export type Xor<A extends Bool, B extends Bool> =
  {
    0: { 0: 0, 1: 1 }
    1: { 0: 1, 1: 0 }
  }[A][B]