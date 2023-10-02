import { SetUnion } from "../set"

/**
 * @since 0.0.2
 */
export type KeyUnion<A, B> = SetUnion<keyof A, keyof B>

/**
 * @since 0.0.2
 */
export type ObjectUnion<A, B> = A & B