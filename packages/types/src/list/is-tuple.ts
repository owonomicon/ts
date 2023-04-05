import { List } from "."

/**
 * whether `L` is a tuple type (including readonly)
 * 
 * @undefined_behavior `L` is never
 * 
 * @time_complexity O(1)
 * 
 * @since 0.0.1
 * 
 * @example
 * ```ts
 * type e0 = IsTuple<any[]>                 // false
 * type e1 = IsTuple<[any?, ...any[]]>      // true
 * type e2 = IsTuple<[any, any?, ...any[]]> // true
 * type e3 = IsTuple<[...any[], any]>       // true
 * type e4 = IsTuple<[any, ...any[], any]>  // true
 * ```
 */
export type IsTuple<L extends List> =
  any[] extends L
    // variadic tuple with leading optional still passes the earlier conditional,
    // so we need to handle that case here.
    ? [L] extends [{ 0?: any }]
      ? true
      : false
    : true

export type IsTupleList<T> =
  T extends List
    ? IsTuple<T>
    : false