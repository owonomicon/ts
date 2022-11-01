/**
 * ensures `A` matches (i.e. extends) `B`.
 * resolves to `A` if `A` already matches `B`.
 * fallback can be overridden from `B` to a different type `C` if desired
 * 
 * previously called "Coerce", but renamed due to advancement of `satisfies` operator planned to be released in TS 4.9 (@see https://github.com/microsoft/TypeScript/issues/47920 ),
 *  which does a functionally similar thing (assert one type can be resolved as another, while keeping specificity of the original type)
 */
export type Satisfies<A, B, C = B> =
  A extends B
    ? A
    : C