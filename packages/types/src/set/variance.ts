import { Unreachable } from "../type"

/**
 * covariant type constructor
 * 
 * @since 0.0.7
 */
export type Covariant<T> =
  T extends any
    ? () => T
    : Unreachable

/**
 * contravariant type constructor
 * 
 * @since 0.0.7
 */
export type Contravariant<T> =
  T extends any
    ? (_: T) => any
    : Unreachable

/**
 * @since 0.0.7
 */
export type InferCovariant<T> =
  [T] extends [() => infer U]
    ? U
    : Unreachable

/**
 * @since 0.0.7
 */
export type InferContravariant<T> =
  [T] extends [(_: infer I) => any]
    ? I
    : Unreachable