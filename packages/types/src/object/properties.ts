import { Omit } from "."

/**
 * extracts just the properties of type `T`
 * this is useful for e.g. extending functions with properties: we can extract the properties of the function,
 *  and redefine a new interface with a new function signature while retaining the old properties
 * 
 * @since 0.0.2
 */
export type Properties<T> = Omit<T, never>