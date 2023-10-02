/**
 * type that errors if `T` is not `true`. the return type is irrelevant and should not be used.
 * 
 * @remarks
 * used for testing types: use relations like `Equals`, `MutuallyAssignable` with boolean operators like `Not`
 * to assert that some relation holds between a tested type and the expected result.
 * 
 * @since 0.0.2
 * 
 * @example
 * ```ts
 * // this code passes the type checker!
 * type Tests = [
 *  // should pass on true
 *  Expect<true>,
 * 
 *  // should error on false
 *  // @ts-expect-error // vscode intellisense doesn't seem to handle `// @ts-expect-error` in the doc comments very well...
 *  Expect<false>,
 * ]
 * ```
 */
export type Expect<T extends true> =
  // `never` always passes the type parameter constraint, so force a ts2589 error here by inducing infinite recursion 
  [T] extends [never] ? Expect<T>
  // same with `any` and `unknown`
  : unknown extends T ? Expect<T>
  : never

/** @internal */
module Tests {
  type MutuallyAssignable<A, B> = import('../type/mutually-assignable').MutuallyAssignable<A, B>

  type Test = [
    /* should pass on `true` */
    Expect<true>,

    /* should error on `false` */
    // @ts-expect-error
    Expect<false>,

    /* should error on `boolean` */
    // @ts-expect-error
    Expect<boolean>,

    // should error on non-boolean number type */
    // @ts-expect-error
    Expect<1>,

    /* should pass on generic evaluating to `true` */
    Expect<MutuallyAssignable<1, 1>>,

    /* should error on generic evaluating to `false` */
    // @ts-expect-error
    Expect<MutuallyAssignable<1, 0>>,

    /* should error on `never` */
    // @ts-expect-error
    Expect<never>,
  
    /* should error on `any` */
    // @ts-expect-error
    Expect<any>,
  
    /* should error on `unknown` */
    // @ts-expect-error
    Expect<unknown>,
  ]
}