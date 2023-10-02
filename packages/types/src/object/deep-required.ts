import { IsTupleList, List } from "../list"
import { Builtin } from "../primitive"
import { IsUnknown } from "../type"
import { Required } from "."

/**
 * makes (nested) keys of an object required
 * 
 * @since 0.0.2
 */
export type DeepRequired<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepRequired<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]-?: DeepRequired<T[K]> }
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
