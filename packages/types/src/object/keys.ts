import { If } from "../bool/if"
import { Not } from "../bool/not"
import { Extends } from "../_meta/extends"
import { PickMutable, PickReadonly } from "./pick"

/**
* gets the required (i.e. non-optional) keys of an object
*/
export type RequiredKeys<T> =
  {
    [K in keyof T]-?:
      If<
        Not<Extends<{}, Pick<T, K>>>,
        K
      >
  }[keyof T]

/**
 * gets the optional keys of an object
 */
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>

/**
 * gets the readonly keys of an object
 */
export type ReadonlyKeys<T> = keyof PickReadonly<T>

/**
 * gets the mutable (i.e. non-readonly) keys of an object
 */
export type MutableKeys<T> = keyof PickMutable<T>