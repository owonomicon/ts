import { Args, Function } from '.'
import { Length } from '../list'

/**
 * gets the arity of a function
 * 
 * @since 0.0.7
 */
export type Arity<F extends Function> = Length<Args<F>>