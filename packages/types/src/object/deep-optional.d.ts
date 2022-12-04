import { List } from "../list/list";
import { Builtin } from "../primitive/builtin";
import { IsTuple } from "../list/is-tuple";
import { IsUnknown } from "../any/is-unknown";
import { Optional } from "./optional";

/**
 * makes (nested) keys of an object optional
 */
export type DeepOptional<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepOptional<U>>
  : IsTuple<T> extends true ? { [K in keyof T]?: DeepOptional<T[K]> }
  : T extends List<infer U> ? List<DeepOptional<U> | undefined>
  : T extends Map<infer K, infer V> ? Map<DeepOptional<K>, DeepOptional<V>>
  : T extends Set<infer U> ? Set<DeepOptional<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepOptional<K>, DeepOptional<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOptional<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepOptional<K>, DeepOptional<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepOptional<U>>
  : T extends {} ? { [K in keyof T]?: DeepOptional<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Optional<T>
