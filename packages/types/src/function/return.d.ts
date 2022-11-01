/**
 * gets the return type of function `F`
 */
export type Return<F> =
  F extends (...args: any) => infer R // use any vs `List` or `any[]` to successfully match against variadic tuple parameters
    ? R
    : never