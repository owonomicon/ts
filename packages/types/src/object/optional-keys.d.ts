import { Exclude } from "../set/exclude";
import { RequiredKeys } from "./required-keys";

/**
 * gets the optional keys of `T`
 * does not capture index signatures.
 *
 * @example
 * type e0 = OptionalKeys<{}> // never
 * type e1 = OptionalKeys<{ a?: 0 }> // "a"
 * type e2 = OptionalKeys<{ a?: 0, b: 1 | undefined, c?: 2 }> // "a" | "c"
 */

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
