import { _IncNonneg } from "../number/int"
import { Omit, Optional, Pick } from "."

/**
 * @private
 */
type _PickN<T, N extends number, NRequired extends number = 0> =
  NRequired extends N
    ? {}
    : { [K in keyof T]: Pick<T, K> & _PickN<Omit<T, K>, N, _IncNonneg<NRequired>> }[keyof T]

/**
 * picks exactly `N` properties of `T`.
 * 
 * @since 0.0.2
 */
export type PickN<T, N extends number> = _PickN<T, N>

/**
 * picks exactly one property of `T`.
 * useful when, for instance, exactly one of two mutually exclusive options must be defined.
 * 
 * @since 0.0.2
 */
export type PickOne<T> = PickN<T, 1>

/**
 * @private
 */
type _PickNOrMore<T, N extends number, NRequired extends number = 0> =
  NRequired extends N
    ? Optional<T>
    : { [K in keyof T]: Pick<T, K> & _PickNOrMore<Omit<T, K>, N, _IncNonneg<NRequired>> }[keyof T]

/**
 * picks at least `N` properties of `T`.
 * 
 * makes all properties in `T` optional, but requires at least `N` properties to be defined.
 * 
 * essentially `Partial`, but with at least `N` of its keys defined (i.e. `PickNOrMore<T, 0>` is functionally equivalent to `Partial<T>`)
 * 
 * @since 0.0.2
 */
export type PickNOrMore<T, N extends number> = _PickNOrMore<T, N>

/**
 * pick at least one property of `T`
 * 
 * @since 0.0.2
 */
export type PickOneOrMore<T> = PickNOrMore<T, 1>