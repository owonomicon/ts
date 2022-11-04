import { List } from "../list/list"
import { Builtin } from "../primitive/builtin"
import { NonNull, NonNullish, NonUndefined, Nullable, Nullishable, Undefinable } from "../primitive/nullish"
import { IsTuple } from "../list/is-tuple"
import { IsUnknown } from "../any/is-unknown"
import { Mutable } from "./mutable"

/**
 * recursively makes keys of an object optional
 */
export type DeepPartial<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepPartial<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T extends List<infer U> ? List<DeepPartial<U> | undefined>
  : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U> ? Set<DeepPartial<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepPartial<K>, DeepPartial<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Partial<T>

/**
 * recursively makes keys of an object required
 */
export type DeepRequired<T> =
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepRequired<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T extends List<infer U> ? List<DeepRequired<U>>
  : T extends Map<infer K, infer V> ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U> ? Set<DeepRequired<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>>
  : T extends {} ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Required<T>

/**
 * recursively makes keys of an object readonly
 */
export type DeepReadonly<T> = 
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepReadonly<U>>
  : IsTuple<T> extends 1 ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T extends List<infer U> ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V> ? Map<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U> ? Set<DeepReadonly<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>>
  : T extends {} ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Readonly<T>

/**
 * recursively makes keys of an object mutable (i.e. not readonly)
 */
export type DeepMutable<T> = 
  T extends Builtin ? T
  : T extends Promise<infer U> ? Promise<DeepMutable<U>>
  : IsTuple<T> extends 1 ? { readonly [K in keyof T]: DeepMutable<T[K]> }
  : T extends List<infer U> ? ReadonlyArray<DeepMutable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepMutable<K>, DeepMutable<V>>
  : T extends Set<infer U> ? Set<DeepMutable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepMutable<K>, DeepMutable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepMutable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepMutable<K>, DeepMutable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepMutable<U>>
  : T extends {} ? { readonly [K in keyof T]: DeepMutable<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Mutable<T>

/**
 * recursively makes values of an object nullishable (i.e. possibly null or undefined)
 */
export type DeepNullishable<T> =
  T extends Builtin ? Nullishable<T>
  : T extends Promise<infer U> ? Promise<DeepNullishable<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: Nullishable<DeepNullishable<T[K]>> }
  : T extends List<infer U> ? List<DeepNullishable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNullishable<K>, DeepNullishable<V>>
  : T extends Set<infer U> ? Set<DeepNullishable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNullishable<K>, DeepNullishable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullishable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNullishable<K>, DeepNullishable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNullishable<U>>
  : T extends {} ? { [K in keyof T]?: DeepNullishable<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Nullishable<T>

/**
 * recursively makes values of an object nullable
 */
export type DeepNullable<T> =
  T extends Builtin ? Nullable<T>
  : T extends Promise<infer U> ? Promise<DeepNullable<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: Nullable<DeepNullable<T[K]>> }
  : T extends List<infer U> ? List<DeepNullable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNullable<K>, DeepNullable<V>>
  : T extends Set<infer U> ? Set<DeepNullable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNullable<K>, DeepNullable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNullable<K>, DeepNullable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNullable<U>>
  : T extends {} ? { [K in keyof T]?: DeepNullable<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Nullable<T>

/**
 * recursively makes values of an object undefinable
 */
export type DeepUndefinable<T> =
  T extends Builtin ? Undefinable<T>
  : T extends Promise<infer U> ? Promise<DeepUndefinable<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: Undefinable<DeepUndefinable<T[K]>> }
  : T extends List<infer U> ? List<DeepUndefinable<U>>
  : T extends Map<infer K, infer V> ? Map<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends Set<infer U> ? Set<DeepUndefinable<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepUndefinable<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepUndefinable<U>>
  : T extends {} ? { [K in keyof T]?: DeepUndefinable<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : Undefinable<T>

/**
 * recursively makes values of an object nonnullishable (i.e. cannot be null or undefined)
 */
export type DeepNonNullish<T> =
  T extends Builtin ? NonNullish<T>
  : T extends Promise<infer U> ? Promise<DeepNonNullish<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: NonNullish<DeepNonNullish<T[K]>> }
  : T extends List<infer U> ? List<DeepNonNullish<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends Set<infer U> ? Set<DeepNonNullish<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonNullish<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonNullish<K>, DeepNonNullish<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonNullish<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonNullish<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : NonNullish<T>

/**
 * recursively makes values of an object nonnullable
 */
export type DeepNonNull<T> =
  T extends Builtin ? NonNull<T>
  : T extends Promise<infer U> ? Promise<DeepNonNull<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: NonNull<DeepNonNull<T[K]>> }
  : T extends List<infer U> ? List<DeepNonNull<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonNull<K>, DeepNonNull<V>>
  : T extends Set<infer U> ? Set<DeepNonNull<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonNull<K>, DeepNonNull<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonNull<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonNull<K>, DeepNonNull<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonNull<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonNull<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : NonNull<T>

/**
 * recursively makes values of an object nonundefinable
 */
export type DeepNonUndefined<T> =
  T extends Builtin ? NonUndefined<T>
  : T extends Promise<infer U> ? Promise<DeepNonUndefined<U>>
  : IsTuple<T> extends 1 ? { [K in keyof T]?: NonUndefined<DeepNonUndefined<T[K]>> }
  : T extends List<infer U> ? List<DeepNonUndefined<U>>
  : T extends Map<infer K, infer V> ? Map<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends Set<infer U> ? Set<DeepNonUndefined<U>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNonUndefined<U>>
  : T extends WeakMap<infer K, infer V> ? WeakMap<DeepNonUndefined<K>, DeepNonUndefined<V>>
  : T extends WeakSet<infer U> ? WeakSet<DeepNonUndefined<U>>
  : T extends {} ? { [K in keyof T]?: DeepNonUndefined<T[K]> }
  : IsUnknown<T> extends 1 ? unknown
  : NonUndefined<T>