/** AtLeastNRequired -- require at least `N` keys in an object to be defined */

import { Length } from "../list"
import { Resolve } from "../type"
import { ValueOf } from "."

/**
 * make all keys in `O` optional
 * 
 * @since 0.0.9
 */
export type Partial<O> = { [K in keyof O]?: O[K] }

type _AtLeastNRequired<O, N extends number, Acc extends never[] = []> =
  Length<Acc> extends N
    ? Partial<O>
    : ValueOf<{ [K in keyof O]: Pick<O, K> & _AtLeastNRequired<Omit<O, K>, N, [...Acc, never]> }>

/**
 * make all keys in `O` optional,
 * but require at least `N` keys to be defined
 * 
 * @since 0.0.9
 */
export type AtLeastNDefined<O, N extends number> = Resolve<_AtLeastNRequired<O, N>>

/**
 * make all keys in `O` optional,
 * but require at least one key to be defined
 * 
 * @since 0.0.9
 */
export type Nonempty<O> = AtLeastNDefined<O, 1>
