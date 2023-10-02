import { Builtin } from "../primitive"
import { Exclude } from "../set"

type Strategy =
  | 'shallow'
  | 'deep'

/**
 * the basic idea behind reducing a type.
 * key ideas:
 * - intersection with empty object
 * - homomorphic mapped type
 */
type _Resolve<T> =
  T extends null | undefined ? T // `null` and `undefined` don't need any resolving
  : T extends Exclude<Builtin, null | undefined> ? T & {} // intersect with empty object here to resolve intersections with builtins, e.g. `string & {}` -> `string`. we don't do this `null` or `undefined` since those two intersected with the empty object produce `never`
  : unknown extends T ? T // in this case `T` is either `any` or `unknown`; whatever the case, neither of those two types need reducing
  : { [K in keyof T]: T[K] } /* & {} */ // mapped type seems to force most intersection types to be computed. not sure if intersection with empty object is needed here because is already mapped type (?)

/**
 * @since 0.0.2
 */
export type ShallowResolve<T> =
  T extends null | undefined ? T
  : T extends Builtin ? T & {}
  : unknown extends T ? T
  : { [K in keyof T]: T[K] }

/**
 * @since 0.0.2
 */
export type DeepResolve<T, Memo = never> =
  T extends null | undefined ? T
  : T extends Builtin ? T & {}
  : unknown extends T ? T
  : [T] extends [Memo] ? T // IsMember<Memo, T>, i.e. if `T` is a member of the union `Memo`
  : { [K in keyof T]: DeepResolve<T[K], T | Memo> }

/**
 * resolve a type to simplify unions/intersections and expand type aliases.
 * mostly useful to see the result of a complex type in the IDE when debugging.
 * 
 * @since 0.0.2
 * 
 * @example
 * 
 * type e4 = Resolve<string & {}> // string
 * 
 * @todo
 * figure out how to resolve function intersections :c
 */
export type Resolve<T, S extends Strategy = 'deep'> =
  S extends 'deep'
    ? DeepResolve<T>
    : ShallowResolve<T>