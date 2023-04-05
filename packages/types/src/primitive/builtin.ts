import { Primitive } from "."

/**
 * type union of builtin types (primitive / function / date / regex / error)
 */
export type Builtin =
  | Primitive
  | Function
  | Date
  | RegExp
  | Error