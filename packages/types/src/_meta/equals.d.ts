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
 *  with the original code, where `[...string[], string] =/= string[]` (desired) but `string[] == [...string[], string]` (not desired; and suddenly order matters?).
 * general shortcomings with alternative (i.e. different from MattMcCutchen's) `Equals` implementations regard false positives (as far as i'm aware),
 *  not any false negatives. `MutuallyAssignable` is one such alternative implementation, that simply checks if both types can be assigned to each other.
 * this properly handles the aforementioned variadic tuple case, and since it doesn't have any known false negatives (afaik),
 *  it is thus used as the check for this variadic tuple case.
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
 * type e11  = Equals<[...string[], string], string[]>                                          // false
 * type e11b = Equals<string[], [...string[], string]>                                          // false
 * type e12 = Equals<[string, ...string[]], string[]>                                           // false
 * type e12b = Equals<string[], [string, ...string[]]>                                          // false
 * 
 * // function intersection
 * type t13a = (x: 0, y: null) => void
 * type t13b = (x: number, y: string) => void
 * type t13c = t13a & t13b
 * type t13d = t13b & t13a
 * type e13 = Equals<t13c, t13d>                                                                // true
 * type e14 = Equals<t13c, t13c | t13d>                                                         // false // BUG: should produce `true`
 * type e15 = Equals<                                                                           // false
 *   { (x: 0, y: null): void; (x: number, y: null): void },
 *   { (x: number, y: null): void; (x: 0, y: null): void }
 * >
 */
export type Equals<A, B, O extends Options = Options<true>> =
  O extends Options<true>
    ? _Equals<ShallowResolve<A>, ShallowResolve<B>>
    : _Equals<A, B>