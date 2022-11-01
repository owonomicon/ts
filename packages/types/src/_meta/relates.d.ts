import { Equals } from "./equals"
import { Extends } from "./extends"

type _SymmetricRelation =
  | 'equals'

type _AsymmetricRelation =
  | 'extends'

type Relation =
  | _SymmetricRelation
  | _AsymmetricRelation
  | `${_AsymmetricRelation}->`
  | `<-${_AsymmetricRelation}`
  
export type Relates<A, B, R extends Relation = 'extends'> =
  {
    'equals': Equals<A, B>
    'extends->': Extends<A, B>
    '<-extends': Extends<B, A>
    'extends': Relates<A, B, 'extends->'>
  }[R]