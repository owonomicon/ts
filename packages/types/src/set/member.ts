import { Contravariant, InferContravariant } from "."

/**
 * extracts a single member of union U
 * 
 * @warning provides no guarantee about order
 * 
 * @note
 * `boolean` is represented by TS internally as the union `true | false`.
 * as a result, this may extract just a single boolean value from the `boolean` type. 
 * 
 * @note
 * it appears that the order of elements in the union as defined does not impact which member is picked.
 * e.g. Member<A | B> == Member<B | A>.
 * however, there are no guarantees for this; it is merely an observation.
 * do submit an issue or let us know if you find evidence suggesting otherwise.
 * 
 * @since 0.0.7
 * 
 * @example
 * ```ts
 * type e0 = Member<0>        // 0
 * type e1 = Member<0 | 1>    // 1 // empirically determined; but what really matters is it's a single member
 * 
 * type w0 = Member<boolean>  // true // ts represents `boolean` internally as a union of `true` and `false`
 * ```
 */
export type Member<U> =
  // by black magics this extracts a single overload from the resultant function intersection/overload
  //  - i.e. a single member of the input union type
  InferContravariant<
    // intersection of types with U in contravariant position -
    //  this is what UnionToIntersection is defined as (but we don't use it here so it looks more interesting using only the bare primitives)
    InferContravariant<Contravariant<
      Contravariant<U>
    >>
  >

/** @internal */
module Tests {
  type Expect<T extends true> = import('..').Test.Expect<T>
  type Eq<A, B> = import('..').Type.MutuallyAssignable<A, B>

  type _ = [
    Expect<Eq<Member<0>, 0>>,

    // the expected value for this given union was determined empirically.
    // but what we really care about here is the fact that it extracts a single member of the union
    Expect<Eq<Member<0 | 1>, 1>>,

    // `boolean` is represented as a union of `true` and `false` internally,
    //  so `Member<boolean>` yields one of those values, not just `boolean`
    Expect<Eq<Member<boolean>, true>>,
  ]
}