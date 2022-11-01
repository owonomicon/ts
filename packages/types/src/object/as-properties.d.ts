import { SeparateProperties } from "./separate-properties"

/**
 * transforms a union type of keys `Keys` to a union type of `Key`: `V` single-property objects 
 * @example
 *    type _e1 = AsProperties<'foo' | 'bar', string> // { foo: string } { bar: string }
 */
export type AsProperties<Keys extends string, V> =
  SeparateProperties<Record<Keys, V>>