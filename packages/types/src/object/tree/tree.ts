/**
 * a recursive structure with string keys and leaves of type `T`
 * 
 * @since 0.0.8
 */
export type Tree<T> = {
  [K: string]: T | Tree<T>
}

/**
 * a tree-like object
 * 
 * @since 0.0.8
 */
export type TreeLike = Record<string, any>