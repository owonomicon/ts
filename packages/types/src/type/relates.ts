import { Equals } from "./equals"
import { Extends } from "./extends"
import { MutuallyAssignable } from "./mutually-assignable"

type SymmetricRelation =
  | 'equals'
  | 'mutually_assignable'

type NonsymmetricRelation =
  | 'extends'

export type Relation =
  | SymmetricRelation
  | NonsymmetricRelation
  | `${NonsymmetricRelation}->`
  | `<-${NonsymmetricRelation}`
  
export type Relates<A, B, R extends Relation = 'extends'> =
  {
    'equals': Equals<A, B>
    'mutually_assignable': MutuallyAssignable<A, B>
    'extends->': Extends<A, B>
    '<-extends': Extends<B, A>
    'extends': Relates<A, B, 'extends->'>
  }[R]