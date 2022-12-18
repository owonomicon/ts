import { __nomicon_unsafe__Inc } from "../number/int/inc"
import { Omit } from "./omit"
import { Optional } from "./optional"
import { Pick } from "./pick"

/**
 * @private
 */
type _AtLeastNRequired<T, N extends number, NRequired extends number = 0> =
  NRequired extends N
    ? Optional<T>
    : { [K in keyof T]: Pick<T, K> & _AtLeastNRequired<Omit<T, K>, N, __nomicon_unsafe__Inc<NRequired>> }[keyof T]

/**
 * makes all properties in `T` optional, but requires at least `N` properties to be defined.
 * essentially `Partial`, but with at least `H` of its keys defined (i.e. `AtLeastNRequired<T, 0>` is equivalent to `Partial<T>`)
 */
export type AtLeastNRequired<T, N extends number> = _AtLeastNRequired<T, N>

/**
 * makes all properties in `T` optional, but requires at least 1 property to be defined.
 */
export type AtLeastOneRequired<T> = AtLeastNRequired<T, 1>