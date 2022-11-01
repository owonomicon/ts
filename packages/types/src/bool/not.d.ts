import { Bool } from "./bool";

export type Not<B extends Bool> = 
  { 0: 1, 1: 0 }[B]