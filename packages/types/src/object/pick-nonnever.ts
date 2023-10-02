import { If } from "../boolean"
import { IsNever } from "../type"
import { Pick } from "."

/**
 * picks the properties of `T` that don't have a type of `never` for their value
 * 
 * @since 0.0.2
 */
export type PickNonNever<T> =
  Pick<
    T,
    {
      [K in keyof T]:
        If<
          IsNever<T[K]>,
          never,
          K
        >
    }[keyof T]
  >
