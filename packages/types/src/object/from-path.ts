import { IsEmpty, List } from "../list"
import { Key } from "."

/**
 * constructs a nested hierarchy of single-key objects from path `L` with final value `V`.
 * 
 * an empty list yields an empty object.
 * 
 * @since 0.0.9
 */
export type FromPath<L extends List<Key>, V> =
  IsEmpty<L> extends true ? {}
  : L extends [infer H extends Key] ? { [K in H]: V }
  : L extends [infer H extends Key, ...infer Tail extends List<Key>] ? { [K in H]: FromPath<Tail, V> }
  : never