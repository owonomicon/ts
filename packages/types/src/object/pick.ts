/**
 * picks the properties of `T` whose keys extend `K`
 * 
 * @since 0.0.2
 */
export type Pick<T, K extends keyof T> = 
  { [P in K]: T[P] }
