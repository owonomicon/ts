import { IsTupleList, List } from "../list"
import { Builtin } from "../primitive"
import { IsUnknown } from "../type"
import { Mutable } from "."

/**
 * makes (nested) keys of an object mutable (i.e. not readonly)
 * 
 * @since 0.0.2
 */
export type DeepMutable<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepMutable<U>>
  : IsTupleList<T> extends true ? { readonly [K in keyof T]: DeepMutable<T[K]> }
  : T extends List<infer U> ? ReadonlyArray<DeepMutable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepMutable<K>, DeepMutable<V>>
  : T extends Set<infer U> ? Set<DeepMutable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepMutable<K>, DeepMutable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepMutable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepMutable<K>, DeepMutable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepMutable<U>>
  : T extends {} ? { readonly [K in keyof T]: DeepMutable<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Mutable<T>
