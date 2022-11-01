import { Increment, Iterate, Iteration, Value } from "../_meta/iterate"

/**
 * @private
 */
type _AtLeastNRequired<T, N extends number, A extends Iteration = Iterate<0>> =
  Value<A> extends N
    ? Partial<T>
    : { [K in keyof T]: Pick<T, K> & _AtLeastNRequired<Omit<T, K>, N, Increment<A>> }[keyof T]

/**
 * makes all properties in `T` optional, but requires at least `N` properties to be defined.
 * essentially `Partial`, but with at least `H` of its keys defined (i.e. `AtLeastNRequired<T, 0>` is equivalent to `Partial<T>`)
 */
export type AtLeastNRequired<T, N extends number> = _AtLeastNRequired<T, N>

/**
 * makes all properties in `T` optional, but requires at least 1 property to be defined.
 */
export type AtLeastOneRequired<T> = AtLeastNRequired<T, 1>