import { If } from "../bool/if";
import { IsNever } from "../any/is-never";
import { Pick } from "./pick";

/**
 * picks the properties of `T` that don't have a type of `never` for their value
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
