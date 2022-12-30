import { List } from "../list/list"
import { Builtin } from "../primitive/builtin"
import { IsTuple } from "../list/is-tuple"
import { IsUnknown } from "../type/is-unknown"
import { Required } from "./required"

/**
 * makes (nested) keys of an object required
 */
export type DeepRequired<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepRequired<U>>
  : IsTuple<T> extends true ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T extends List<infer U> ? List<DeepRequired<U>>
  : T extends Map<infer K, infer V> ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U> ? Set<DeepRequired<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>>
  : T extends {} ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Required<T>
