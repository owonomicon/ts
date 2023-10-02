import { Primitive } from "."

/**
 * type union of builtin types (primitive / function / date / regex / error)
 * 
 * @since 0.0.2
 */
export type Builtin =
  | Primitive
  | Function
  | Date
  | RegExp
  | Error