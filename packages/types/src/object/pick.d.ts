/**
 * picks the properties of `T` whose keys extend `K` 
 */
export type Pick<T, K extends keyof T> = 
  { [P in K]: T[P] }
