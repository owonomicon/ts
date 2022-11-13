import { IsNever } from "../any/is-never";
import { If } from "../bool/if";
import { Not } from "../bool/not";
import { ElementOf } from "../list/element-of";
import { Head } from "../list/head";
import { IsEmpty } from "../list/is-empty";
import { Last } from "../list/last";
import { List } from "../list/list";
import { Reverse } from "../list/reverse";
import { Parts } from "../list/_parts";
import { Satisfies } from "../_meta/satisfies";

// single argument function
type F<A = any, R = any> = (x: A) => R
type Arg<Fn> = Fn extends (x: infer A) => any ? A : never
type Ret<Fn> = Fn extends (x: any) => infer R ? R : never

/**
 * select the functions in union of functions `U` whose argument `X` can be assigned to 
 */
type SelectFns<U extends F, X> =
  U extends (_: infer A) => any
    ? X extends A
      ? U
      : never
    : never

/**
 * 
 * 
 * @todo simplify this monstrosity
 * @todo properly handle optionals (treat them as required for the sake of the type. could do this in the caller side too, but directly calling doesnt work because unions then mess up things)
 */
type _Narrowed<L extends List<F>, Acc extends List<F> = []> =
  // 1: if L is empty, then return the accumulated result.
  IsEmpty<L> extends 1 ? Acc
  // 2: if L contains a single element, then return the accumulated result with the remaining element appended.
  //    it's safe to do this because if L was originally a single element, then that's valid, and if it wasn't,
  //      then that element would've been validated with the earlier elements (see later)
  : L extends [infer X] ? [...Acc, X]
  // 3: if L has 2 or more elements, where the first two elements are not spread elements,
  //      ensure that those first two elements can be piped together,
  //      then recurse on the list with the head removed
  : L extends [infer H, infer HH, ...infer T] ?
    // 3.a: ensure the first two elements can be piped 
    Ret<H> extends Arg<HH>
      ? SelectFns<Satisfies<HH, F>, Ret<H>> extends infer HH1  // if HH is a union, select its members that H can pipe to
        ? _Narrowed<
          [Satisfies<HH1, F>, ...Satisfies<T, List<F>>],
          // add the head to the accumulated result
          [...Acc, Satisfies<H, F>]
        >
        : never
      : never
  // 4. otherwise, if L's first element is not a spread, then we know the second element is a spread
  //      (we know it has to either have a spread at the start or the second element,
  //      since we tested for empty at step 1, single element step 2, 2+ nonleading spread step 3).
  //    in this case, ensure that:
  //      a: the head and spread can be piped together
  //      b: the spread (narrowed to those which can be piped with the head) can be piped with itself
  //      c: the head and element directly following the spread can be piped together
  //      d: the spread (narrowed to those which can be piped with the head, and then of those narrowed to those which can be piped with themselves)
  //          and element directly following the spread (also narrowed to those which can be piped with the head) can be piped together
  //      and then recurse on the list with the head removed.
  : L extends [infer H, ...infer T] ?
    Parts<T> extends [any, infer S, infer TT]                                             // extract spread and post-spread parts of T
      // 4.a: narrow H - S
      ? ElementOf<Satisfies<S, List<F>>> extends infer E                                  // capture spread element type
        ? Ret<H> extends Arg<E>                                                           // ensure return of H can be passed as arg to spread element
          ? SelectFns<Satisfies<E, F>, Ret<H>> extends infer EE                           // narrow spread element to fns where return of H can be assigned to its arg
            // 4.b: narrow S - S
            ? Ret<EE> extends Arg<EE>                                                     // ensure return of spread element can be passed as arg to spread element
              ? SelectFns<Satisfies<EE, F>, Ret<EE>> extends infer EEE                    // narrow spread element to fns where its return can be assigned to its arg
                ? Ret<EEE> extends Arg<EEE>                                               // ensure this narrowed spread element can be passed as arg to itself
                  ? SelectFns<Satisfies<EEE, F>, Ret<EEE>> extends infer EEEE
                    // check TT nonempty
                    ? Satisfies<TT, List<F>> extends [infer HT, ...infer TTT]             // check if TT is non-empty and capture its head
                      // 4.c: narrow H - HT 
                      ? Ret<H> extends Arg<HT>                                            // ensure return of H can be passed as arg to head of post-spread
                        ? SelectFns<Satisfies<HT, F>, Ret<H>> extends infer HT1           // narrow head of post-spread elements to fns where return of H can be assigned to its arg
                          // 4.d: narrow S - HT
                          ? Ret<EEEE> extends Arg<HT1>                                    // ensure return of spread element can be passed as arg to head of post-spread
                            ? SelectFns<Satisfies<HT1, F>, Ret<EEEE>> extends infer HT2   // narrow head of post-spread elements to fns where return of spread can be assigned to its arg
                              ? _Narrowed<
                                  Satisfies<[Satisfies<HT2, F>, ...TTT], List<F>>,
                                  [...Acc, Satisfies<H, F>, ...Satisfies<EEEE, F>[]]
                                >
                              : never
                            : never
                          : never
                        : never
                      // no step 4.c or 4.d to do since there's no element following the spread
                      : [...Acc, Satisfies<H, F>, ...EE[]]
                    : never
                  : never
                : never
              : never
            : never
          : never
        : never
      : never // unreachable
  // 5. we're not interested in handling lists with optional elements here.
  : L extends { 0?: any } ? never
  // L must start with a spread at this point
  // 6. if L starts with a spread and has other elements after it (i.e. is a variadic tuple, not just a whatever[]),
  //  basically do the same thing as step 4, except using the type of the spread in place of `H`
  : L extends [...any, any] ?                                                   // this case is only reached when the initial `L` begins with a spread
    Parts<L> extends [any, infer S, infer T]                                    // extract spread and post-spread parts of L
      ? ElementOf<Satisfies<S, List<F>>> extends infer E                        // capture spread element type
        // narrow S - S
        ? Ret<E> extends Arg<E>                                                 // ensure return of spread element type can be passed as arg to spread element type
          ? SelectFns<Satisfies<E, F>, Ret<E>> extends infer EE                 // narrow spread element type to fns where its return can be assigned to its arg
            ? Ret<EE> extends Arg<EE>
              ? SelectFns<Satisfies<EE, F>, Ret<EE>> extends infer EEE
                ? Satisfies<T, List<F>> extends [infer HT, ...infer TT]         // capture head and tail of T. this always resolves since T must be nonempty with no optional and no spread
                  // narrow S - HT
                  ? Ret<EE> extends Arg<HT>                                     // ensure return of spread element can be passed as arg to head of post-spread
                    ? SelectFns<Satisfies<HT, F>, Ret<EEE>> extends infer HT1   // narrow head of post-spread to fns where return of spread can be assigned to its arg
                      ? _Narrowed<
                          Satisfies<[HT1, ...TT], List<F>>,
                          [...Acc, ...Satisfies<EEE, F>[]]
                        >
                      : never
                    : never
                  : never // unreachable, since T must be non-empty
                : never
              : never
            : never
          : never
        : never
      : never
  // 7. L must be a lone spread i.e. a regular variadic list at this point.
  //    once again do basically the same thing as step 4 or 6, just without a head or tail this time
  : ElementOf<L> extends infer E
    ? Ret<E> extends Arg<E>
      ? SelectFns<Satisfies<E, F>, Ret<E>> extends infer EE
        ? Ret<EE> extends Arg<EE>
          ? SelectFns<Satisfies<EE, F>, Ret<EE>> extends infer EEE
            ? [...Acc, ...Satisfies<EEE, F>[]]
            : never
          : never
        : never
      : never
    : never

type Narrowed<L extends List> =
  _Narrowed<L>

/**
 * composes a list of 1-argument functions.
 * 
 * @warning lists with optional elements are not allowed and will trigger an error.
 * @warning may not have expected behavior if list contains a spread of a union of functions.
 * 
 * @example
 * 
 * type sb = (_: string) => boolean
 * type sn = (_: string) => number
 * type ss = (_: string) => string
 * type nb = (_: number) => boolean
 * type nn = (_: number) => number
 * type ns = (_: number) => string
 * 
 * type e0 = Pipe<never>                        // (x: never) => never 
 * type e1 = Pipe<[]>                           // (x: never) => never
 * type e2 = Pipe<ss[]>                         // (x: string) => string
 * type e3 = Pipe<[sn]>                         // (x: string) => number
 * type e4 = Pipe<[sn, nb]>                     // (x: string) => boolean
 * type e5 = Pipe<[...ss[], sn]>                // (x: string) => number
 * type e6 = Pipe<[sn, ...nn[]]>                // (x: string) => number
 * type e7 = Pipe<[sn, ...nn[], nb]>            // (x: string) => boolean 
 * type e8 = Pipe<[sn, ...nn[], (ns | sn), sb]> // (x: string) => boolean
 * type e9 = Pipe<[sn, ...nn[], (ns | sn), nb]> // error(2344): Type '[sn, ...nn[], sn | ns, nb]' does not satisfy the constraint 'never'. // union gets resolved to `ns` to match spread and pre-spread, so following `nb` cannot match
 * type e10 = Pipe<[sn?]>                       // error(2344): Type '[(sn | undefined)?]' does not satisfy the constraint 'never'. // optionals are not allowed 
 * type e11 = Pipe<[sn, ...(ns | sn)[]]>        // error(2344): Type '[sn, ...(sn | ns)[]]' does not satisfy the constraint 'never'. // unioned spread elements may not be handled properly
 */
export type Pipe<
  L extends (
    If<
      Not<IsNever<Narrowed<L>>>,
      List<F>
    >
  )
> =
  Narrowed<L> extends infer LL // eliminate invalid unions in `L`, i.e. ensure the resulting `LL` consists of the list of functions that can be chained.
    ? LL extends List<F>
      ? F<
          Arg<Head<Satisfies<LL, List<F>>>>,
          Ret<Last<Satisfies<LL, List<F>>>>
        >
      : never
    : never // unreachable

export type Compose<
    L extends (
      If<
        Not<IsNever<Narrowed<Reverse<L>>>>,
        List<F>
      >
    )
  > =
    Narrowed<Reverse<L>> extends infer LL
      ? LL extends List<F>
        ? F<
          Arg<Head<Satisfies<LL, List<F>>>>,
          Ret<Last<Satisfies<LL, List<F>>>>
        >
        : never
      : never
/*
possible shortcomings
- suppose we have [sn, ...(nb | bb)[]]. in theory this should be convertible to [sn, ...[nb, ...bb[]]] but there's probably no easy way to do that...
- suppose we have [sn, ...(ns, sn)[]] or any other case where it forms a loop. this would probably get way too complicated.

but can't restrict _all_ unions either, bc e.g. if you have (string)=>"foo"|(string)=>"bar", the functions are distinct but do allow for repeating.
perhaps the most practical solution is to just disallow variadics and be done with it, leaving it as a constraint of the type.
*/