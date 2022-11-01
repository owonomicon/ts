/**
 * a list with elements of type `T`
 */
export type List<T = any> =
  | Array<T>
  | ReadonlyArray<T>