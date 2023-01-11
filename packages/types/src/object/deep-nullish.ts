import { IsTupleList } from "../list/is-tuple"
import { List } from "../list/list"
import { Builtin } from "../primitive/builtin"
import { NonNull, NonNullish, NonUndefined, Nullable, Nullishable, Undefinable } from "../primitive/nullish"
import { IsUnknown } from "../type/is-unknown"

/**
 * makes (nested) values of an object nullishable (i.e. possibly null or undefined)
 */
export type DeepNullishable<T> =
  T extends Builtin ? Nullishable<T>
  : T extends Promise<infer U> ? Promise<DeepNullishable<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: Nullishable<DeepNullishable<T[K]>> }
  : T extends List<infer U> ? List<DeepNullishable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNullishable<K>, DeepNullishable<V>>
  : T extends Set<infer U> ? Set<DeepNullishable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNullishable<K>, DeepNullishable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullishable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNullishable<K>, DeepNullishable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNullishable<U>>
  : T extends {} ? { [K in keyof T]?: DeepNullishable<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Nullishable<T>

/**
 * makes (nested) values of an object nullable
 */
export type DeepNullable<T> =
  T extends Builtin ? Nullable<T>
  : T extends Promise<infer U> ? Promise<DeepNullable<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: Nullable<DeepNullable<T[K]>> }
  : T extends List<infer U> ? List<DeepNullable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNullable<K>, DeepNullable<V>>
  : T extends Set<infer U> ? Set<DeepNullable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNullable<K>, DeepNullable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNullable<K>, DeepNullable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNullable<U>>
  : T extends {} ? { [K in keyof T]?: DeepNullable<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Nullable<T>

/**
 * makes (nested) values of an object undefinable
 */
export type DeepUndefinable<T> =
  T extends Builtin ? Undefinable<T>
  : T extends Promise<infer U> ? Promise<DeepUndefinable<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: Undefinable<DeepUndefinable<T[K]>> }
  : T extends List<infer U> ? List<DeepUndefinable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends Set<infer U> ? Set<DeepUndefinable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepUndefinable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepUndefinable<U>>
  : T extends {} ? { [K in keyof T]?: DeepUndefinable<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : Undefinable<T>

/**
 * makes (nested) values of an object nonnullishable (i.e. cannot be null or undefined)
 */
export type DeepNonNullish<T> =
  T extends Builtin ? NonNullish<T>
  : T extends Promise<infer U> ? Promise<DeepNonNullish<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: NonNullish<DeepNonNullish<T[K]>> }
  : T extends List<infer U> ? List<DeepNonNullish<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends Set<infer U> ? Set<DeepNonNullish<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonNullish<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonNullish<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonNullish<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : NonNullish<T>

/**
 * makes (nested) values of an object nonnullable
 */
export type DeepNonNull<T> =
  T extends Builtin ? NonNull<T>
  : T extends Promise<infer U> ? Promise<DeepNonNull<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: NonNull<DeepNonNull<T[K]>> }
  : T extends List<infer U> ? List<DeepNonNull<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonNull<K>, DeepNonNull<V>>
  : T extends Set<infer U> ? Set<DeepNonNull<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonNull<K>, DeepNonNull<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonNull<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonNull<K>, DeepNonNull<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonNull<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonNull<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : NonNull<T>

/**
 * makes (nested) values of an object nonundefinable
 */
export type DeepNonUndefined<T> =
  T extends Builtin ? NonUndefined<T>
  : T extends Promise<infer U> ? Promise<DeepNonUndefined<U>>
  : IsTupleList<T> extends true ? { [K in keyof T]?: NonUndefined<DeepNonUndefined<T[K]>> }
  : T extends List<infer U> ? List<DeepNonUndefined<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends Set<infer U> ? Set<DeepNonUndefined<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonUndefined<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonUndefined<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonUndefined<T[K]> }
  : IsUnknown<T> extends true ? unknown
  : NonUndefined<T>