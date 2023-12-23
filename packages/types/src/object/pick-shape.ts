import { List } from "../list"
import { UnionToIntersection } from "../set"
import { IsNever, Resolve, Unreachable } from "../type"
import { KeyPaths } from "./key-paths"
import { FromPath } from "./from-path"
import { DeepGet, Key } from "."

/**
 * constructs a single path
 */
type _PickPath<O, Path extends List<Key>> =
  // distribute over the paths
  Path extends any
    // and for each one, get the corresponding value in `O` for it
    ? DeepGet<O, Path> extends infer V
      ? IsNever<V> extends false
        // and construct the object from the path
        ? FromPath<Path, DeepGet<O, Path>>
        // (dont bother with paths not in O)
        : never
      : Unreachable
    : Unreachable

/**
 * pick from O1 the keys defined in O2.
 * 
 * does not account for property modifiers.
 * 
 * @since 0.0.9
 * 
 * @example
 * ```ts
 * type t0a = { a: { b: 0, c: 1 }, d: 4, e: 5 }
 * type t0b = { a: { b: 6       }, d: 7,       z: 8 }
 * //         { a: { b: 0;      }; d: 4;      }
 * type e0 = PickShape<t0a, t0b>
 * 
 * type t1a = { a: 1, b: { c: 2, d: {e: 3, f: 4 } }, g: 5, h: { i: 6, j: 7  } }
 * type t1b = { a: 9, b: {       d: {      f: 8 } },       h: 7,              z: 6 }
 * //         { a: 1; b: {       d: {      f: 4;};};       h: { i: 6; j: 7; };}
 * type e1 = PickShape<t1a, t1b>
 * ```
 */
export type PickShape<O1, O2> =
  KeyPaths<O2> extends [infer Paths extends Key[], any]
    ? Resolve<UnionToIntersection<_PickPath<O1, Paths>>>
    : never