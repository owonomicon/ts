import { Bool } from "./bool";

export type And<A extends Bool, B extends Bool> =
  {
    0: { 0: 0, 1: 0 }
    1: { 0: 0, 1: 1 }
  }[A][B]