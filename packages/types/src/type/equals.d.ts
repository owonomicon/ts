import { MutuallyAssignable } from "./mutually-assignable"
import { ShallowResolve } from "./resolve"

type Options<RI extends boolean = boolean> = {
  resolve_intersections: RI
}

/**
 * checks whether types `A` and `B` are identical.
 * 
 * does not resolve intersection types (e.g. `{ a: 0 } & { b: 1 }` will be considered not equal to `{ a: 0, b: 1 }`).
 * 
 * adapted from MattMcCutchen's answer in {@link https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650}.
 * 
 * this is modified to try to address a niche edge case (possibly didn't even exist at the time of the answer?) with variadic tuples:
 *  with the original code, `[...string[], string]` and `string[]` are considered "equal".
 * general shortcomings with alternative (i.e. different from MattMcCutchen's) `Equals` implementations regard false positives (as far as i'm aware),
 *  not any false negatives. `MutuallyAssignable` is one such alternative implementation, that simply checks if both types can be assigned to each other.
 *  it happens to properly handle the aforementioned variadic tuple case, and since it doesn't have any known false negatives (afaik),
 *    it is thus used as the check for this variadic tuple case.
 */
type _Equals<A, B> =
  (<T>() => T extends A ? true : false) extends (<T>() => T extends B ? true : false)
    // instead of just returning "true" here, also do mutual assignability check to validate variadic tuple
    ? MutuallyAssignable<A, B>
    : false

/**
 * whether types `A` and `B` are identical.
 * 
 * by default will try to resolve intersection types (e.g. convert `{ a: 0 } & { b: 1 }` into `{ a: 0, b: 1 }`).
 * this is usually what you want. an option is provided to not do so as well.
 * 
 * adapted from @author Matt McCutchen
 * @see https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 * 
 * @warning known issues:
 * - certain intersections don't get properly resolved, even when `resolve_intersections` is `true` (e.g. intersection of functions; see e14). as a result there may be false negatives with regards to function intersections.
 * 
 * @example
 * // many of these examples taken from the thread https://github.com/Microsoft/TypeScript/issues/27024
 * 
 * type e0   = Equals<number, string>                                                           // false
 * type e1   = Equals<1, 1>                                                                     // true
 * type e2   = Equals<any, 1>                                                                   // false
 * type e3   = Equals<1 | 2, 1>                                                                 // false
 * type e5   = Equals<any, never>                                                               // false
 * type e6   = Equals<[any], [number]>                                                          // false
 * 
 * // object intersection
 * type e7   = Equals<{ x: 1 } & { y: 2 }, { x: 1, y: 2 }>                                      // true
 * type e8   = Equals<{ x: 1 } & { y: 2 }, { x: 1, y: 2}, { resolve_intersections: false }>     // false
 * 
 * // primitive intersection
 * type e9   = Equals<number & {}, number>                                                      // true
 * type e10  = Equals<number & {}, number, { resolve_intersections: false }>                    // false
 * 
 * // variadic tuple
 *     
 * type t11a = string[] 
 * type t11b = [string, ...string[]] 
 * type t11c = [...string[], string] 
 * type t11d = [string, ...string[], string]
 *
 * type e11a = Equals<t11a, t11b>                                                               // false
 * type e11b = Equals<t11b, t11a>                                                               // false
 * type e12a = Equals<t11a, t11c>                                                               // false
 * type e12b = Equals<t11c, t11a>                                                               // false
 * type e13a = Equals<t11a, t11d>                                                               // false
 * type e13b = Equals<t11d, t11a>                                                               // false
 * type e14a = Equals<t11b, t11c>                                                               // false
 * type e14b = Equals<t11c, t11b>                                                               // false
 * type e15a = Equals<t11b, t11d>                                                               // false
 * type e15b = Equals<t11d, t11b>                                                               // false
 * type e16a = Equals<t11c, t11d>                                                               // false
 * type e16b = Equals<t11d, t11c>                                                               // false
 * 
 * // function intersection
 * type t17a = (x: 0, y: null) => void
 * type t17b = (x: number, y: string) => void
 * type t17c = t17a & t17b
 * type t17d = t17b & t17a
 * type e17 = Equals<t17c, t17d>                                                                // true
 * type e18 = Equals<t17c, t17c | t17d>                                                         // false // BUG: should produce `true`
 * 
 * type e19 = Equals<                                                                           // false
 *   { (x: 0, y: null): void; (x: number, y: null): void },
 *   { (x: number, y: null): void; (x: 0, y: null): void }
 * >
 */
export type Equals<A, B, Opts extends Options = Options<true>> =
  Opts extends Options<true>
    ? _Equals<ShallowResolve<A>, ShallowResolve<B>>
    : _Equals<A, B>