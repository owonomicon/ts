import { MutuallyAssignable, ShallowResolve } from "."

/**
 * checks whether types `A` and `B` are considered "identical" internally by TS.
 * note that this is in regards to the types themselves, _not_ necessarily what they get reduced to.
 * 
 * one not uncommon use case affected by this shortcoming is in it not properly handling intersections
 *  (e.g. `{ a: 0 } & { b: 1 }` is not considered identical to `{ a: 0, b: 1 }`)
 * 
 * it may also fail on certain forms of variadic tuples (e.g. `[...T[], T]` is erroneously considered identical to `T[]`)
 * 
 * adapted from MattMcCutchen's answer in {@link https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650}
 */
type InternallyIdentical<A, B> =
  // unioning the types with T resolves unions, e.g.
  // ```ts
  // InternallyIdentical<{ _: any }, { _: any } | {_: any }> // expect true; false, if no unioning the types with T
  // ```
  // it also happens to resolve it failing on _certain forms_ of variadic tuples (as described in the jsdoc for this type).
  // however, it also borks a specific case of function intersections.
  // ```ts
  // type a = (x: 0) => void; type b = (x: 1) => void;
  // type ab = a & b; type ba = b & a;
  // InternallyIdentical<ab, ab | ba> // `true`, after unioning
  // ```
  // although considering how the function still considers ab == ba when they are unfortunately different at least it makes it more consistently wrong i guess,
  // and that case was probably a "bug" (correcting another bug) from the union in the first place.
  // 
  // to see more on function overloads/intersections:
  // - overload order matters, last overload always picked for function inference - https://github.com/microsoft/TypeScript/issues/30369#issuecomment-476402214 / https://github.com/microsoft/TypeScript/issues/29312#issuecomment-469071119
  // or to quote the (admittedly extremely outdated) TS Language Specification (for v1.8, very outdated, deprecated):
  // > While it is generally true that A & B is equivalent to B & A, the order of the constituent types may matter when determining the call and construct signatures of the intersection type.
  //                     v                                            v
  (<T>() => T extends (A | T) ? 0 : 1) extends (<T>() => T extends (B | T) ? 0 : 1)
    ? true
    : false

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
  InternallyIdentical<A, B> extends true
    // handle variadic tuple edge case(s) that `InternallyIdentical` exhibits incorrect behavior with.
    // this should be safe since there aren't any false negatives with mutual assignability check, only false positives (afaik)
    ? MutuallyAssignable<A, B>
    : false

type Options<RI extends boolean = boolean> = {
  resolve_intersections: RI
}
    
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
 * - it appears certain intersections may not produce the expected result, even when `resolve_intersections` is `true`.
 * if you find one not already identified in tests, please submit an issue with a minimal example describing it
 * - function overloads can be weird and not produce the expected result.
 * 
 * @example
 * ```ts
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
 * type e17 = Equals<t17c, t17d>                                                                // false
 * type e18 = Equals<t17c, t17c | t17d>                                                         // false
 * ```
 */
export type Equals<A, B, Opts extends Options = Options<true>> =
  Opts extends Options<true>
    ? _Equals<ShallowResolve<A>, ShallowResolve<B>>
    : _Equals<A, B>

/** @internal */
module Tests {
  type Expect<T extends true> = import('..').Test.Expect<T>
  type Not<T extends boolean> = import('..').Boolean.Not<T>

  type stringlist = string[]
  type string_stringlist = [string, ...string[]]
  type stringlist_string = [...string[], string]
  type string_stringlist_string = [string, ...string[], string]
  type string_stringlist_string_string = [string, ...string[], string, string]

  type fn_a = (_: 0) => void
  type fn_b = (_: 1) => void
  type ab = fn_a & fn_b
  type ba = fn_b & fn_a

  /**
   * many of these tests are courtesy of https://github.com/Microsoft/TypeScript/issues/27024
   */
  type _ = {
    Equals: [
      // basic tests

      Expect<Not<Equals<number, string>>>,
      Expect<Equals<1, 1>>,
      Expect<Not<Equals<any, 1>>>,
      Expect<Not<Equals<1 | 2, 1>>>,
      Expect<Not<Equals<any, never>>>,
      Expect<Not<Equals<[any], [number]>>>,
      Expect<Not<Equals<void, unknown>>>,
      Expect<Not<Equals<void, any>>>,
      Expect<Not<Equals<void, never>>>,
      Expect<Equals<never, never>>,
      Expect<Equals<any, any>>,
      Expect<Equals<unknown, unknown>>,
      Expect<Equals<void, void>>,

      // object intersection

      Expect<Equals<{ x: 1 } & { y: 2 }, { x: 1, y: 2 }>>,
      Expect<Not<Equals<{ x: 1 } & { y: 2 }, { x: 1, y: 2}, { resolve_intersections: false }>>>,

      // primitive intersection

      Expect<Equals<number & {}, number>>,
      Expect<Not<Equals<number & {}, number, { resolve_intersections: false }>>>,

      // variadic tuple

      Expect<Not<Equals<stringlist, string_stringlist>>>,
      Expect<Not<Equals<string_stringlist, stringlist>>>,
      Expect<Not<Equals<stringlist, stringlist_string>>>,
      Expect<Not<Equals<stringlist_string, stringlist>>>,
      Expect<Not<Equals<stringlist, string_stringlist_string>>>,
      Expect<Not<Equals<string_stringlist_string, stringlist>>>,
      Expect<Not<Equals<string_stringlist, stringlist_string>>>,
      Expect<Not<Equals<stringlist_string, string_stringlist>>>,
      Expect<Not<Equals<string_stringlist, string_stringlist_string>>>,
      Expect<Not<Equals<string_stringlist_string, string_stringlist>>>,
      Expect<Not<Equals<stringlist_string, string_stringlist_string>>>,
      Expect<Not<Equals<string_stringlist_string, stringlist_string>>>,
      Expect<Not<Equals<string_stringlist_string, string_stringlist_string_string>>>,
      Expect<Equals<stringlist, stringlist>>,
      Expect<Equals<string_stringlist, string_stringlist>>,
      Expect<Equals<stringlist_string, stringlist_string>>,
      Expect<Equals<string_stringlist_string, string_stringlist_string>>,

      // function intersections

      Expect<Not<Equals<fn_a, fn_b>>>,
      Expect<Equals<ab, ab>>,
      Expect<Equals<ba, ba>>,
      // @ts-expect-error BUG - function overload/intersection order does in fact matter
      Expect<Not<Equals<ab, ba>>>,
      // @ts-expect-error BUG - function overload/intersection order does in fact matter
      Expect<Not<Equals<ab, ab | ba>>>,
      Expect<Not<Equals<
        { (_: 0): void; (_: 1): void },
        { (_: 1): void; (_: 0): void }
      >>>,
    ]

    __Equals: [
      // basic tests

      Expect<Not<InternallyIdentical<number, string>>>,
      Expect<InternallyIdentical<1, 1>>,
      Expect<Not<InternallyIdentical<any, 1>>>,
      Expect<Not<InternallyIdentical<1 | 2, 1>>>,
      Expect<Not<InternallyIdentical<any, never>>>,
      Expect<Not<InternallyIdentical<[any], [number]>>>,
      Expect<Not<Equals<void, unknown>>>,
      Expect<Not<Equals<void, any>>>,
      Expect<Not<Equals<void, never>>>,
      Expect<InternallyIdentical<never, never>>,
      Expect<InternallyIdentical<any, any>>,
      Expect<InternallyIdentical<unknown, unknown>>,
      Expect<InternallyIdentical<void, void>>,

      // object intersection

      // @ts-expect-error BUG - does not work with intersections
      Expect<InternallyIdentical<{ x: 1 } & { y: 2 }, { x: 1, y: 2 }>>,

      // primitive intersection

      // @ts-expect-error BUG - does not work with intersections
      Expect<InternallyIdentical<number & {}, number>>,

      // variadic tuple

      Expect<Not<InternallyIdentical<stringlist, string_stringlist>>>,
      Expect<Not<InternallyIdentical<string_stringlist, stringlist>>>,
      // (resolved with unioning with T) // @ts-expect-error BUG - cannot distinguish between x[] and [...x[], x]
      Expect<Not<InternallyIdentical<stringlist, stringlist_string>>>,
      // (resolved with unioning with T) // @ts-expect-error BUG - cannot distinguish between x[] and [...x[], x]
      Expect<Not<InternallyIdentical<stringlist_string, stringlist>>>,
      Expect<Not<InternallyIdentical<stringlist, string_stringlist_string>>>,
      Expect<Not<InternallyIdentical<string_stringlist_string, stringlist>>>,
      Expect<Not<InternallyIdentical<string_stringlist, stringlist_string>>>,
      Expect<Not<InternallyIdentical<stringlist_string, string_stringlist>>>,
      // @ts-expect-error BUG - cannot distinguish between x[] and [...x[], x]
      Expect<Not<InternallyIdentical<string_stringlist, string_stringlist_string>>>,
      // @ts-expect-error BUG - cannot distinguish between x[] and [...x[], x]
      Expect<Not<InternallyIdentical<string_stringlist_string, string_stringlist>>>,
      Expect<Not<InternallyIdentical<stringlist_string, string_stringlist_string>>>,
      Expect<Not<InternallyIdentical<string_stringlist_string, stringlist_string>>>,
      // @ts-expect-error BUG - cannot distinguish between x[] and [...x[], x]
      Expect<Not<InternallyIdentical<string_stringlist_string, string_stringlist_string_string>>>,
      Expect<InternallyIdentical<stringlist, stringlist>>,
      Expect<InternallyIdentical<string_stringlist, string_stringlist>>,
      Expect<InternallyIdentical<stringlist_string, stringlist_string>>,
      Expect<InternallyIdentical<string_stringlist_string, string_stringlist_string>>,

      // function intersections
      
      Expect<Not<InternallyIdentical<fn_a, fn_b>>>,
      Expect<InternallyIdentical<ab, ab>>,
      Expect<InternallyIdentical<ba, ba>>,
      // @ts-expect-error BUG - function overload/intersection order does in fact matter
      Expect<Not<InternallyIdentical<ab, ba>>>,
      // @ts-expect-error BUG - unioning with T makes this resolve to true
      Expect<Not<InternallyIdentical<ab, ab | ba>>>,
      Expect<Not<InternallyIdentical<
        { (_: 0): void; (_: 1): void },
        { (_: 1): void; (_: 0): void }
      >>>,
    ]
  }

  type d = { _: any }
  type dd = { _: any } | { _: any }
  type idk = Expect<InternallyIdentical<d, dd>>
}