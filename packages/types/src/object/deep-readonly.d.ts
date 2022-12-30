import { List } from "../list/list"
import { Builtin } from "../primitive/builtin"
import { IsTuple } from "../list/is-tuple"
import { IsUnknown } from "../type/is-unknown"
import { Readonly } from "./readonly"

/**
 * makes (nested) keys of an object readonly
 */
export type DeepReadonly<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepReadonly<U>>
  : IsTuple<T> extends true ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T extends List<infer U> ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V> ? Map<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U> ? Set<DeepReadonly<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>>
  : T extends {} ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Readonly<T>
