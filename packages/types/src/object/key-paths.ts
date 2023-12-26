import { Or } from "../boolean"
import { List } from "../list"
import { Builtin } from "../primitive"
import { Extends, IsAny, IsNever, IsUnknown, Satisfies, Unreachable } from "../type"
import { Key, ValueOf } from "."

type _KeyPaths<T, K extends Key = Key, Leaf = Builtin, Acc extends List<K> = []> =
  Or.Unbounded<[IsAny<T>, IsUnknown<T>, IsNever<T>, Extends.Nondistributive<T, Leaf>]> extends true ? [path: Acc, value: T]
  : T extends Record<K, any>
    ? ValueOf<{ [P in keyof T]: _KeyPaths<T[P], K, Leaf, [...Acc, Satisfies<P, K>]> }> 
    : [path: Acc, value: T]

/**
 * creates a union type of all string key paths to any given leaf in an object
 * 
 * @since 0.0.9
 */
export type KeyPaths<O, K extends Key = Key, Leaf = Builtin> =
  O extends Record<K, any>
    ? _KeyPaths<O, K, Leaf> extends infer R
      // sanity check: path should never be empty
      // (e.g. objects that satisfy the Record check but don't make sense e.g. are a leaf e.g. RegExp given the default leaf type).
      // this also handles cases where R would be undefined (e.g. `KeyPaths<{ a: { b?: 0, c: 1 }}>`)
      ? R extends [[any, ...any], any]
        ? R
        : never
      : Unreachable
    : never