import { Record, SeparateProperties } from "."

/**
 * transforms a union type of keys `Keys` to a union type of `Key`: `V` single-property objects
 * 
 * @since 0.0.2
 * 
 * @example
 *    type _e1 = AsProperties<'foo' | 'bar', string> // { foo: string } { bar: string }
 */
export type AsProperties<Keys extends string, V> =
  SeparateProperties<Record<Keys, V>>