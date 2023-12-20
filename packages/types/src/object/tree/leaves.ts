import { Tree } from "./tree"

/**
 * infers the type of the leaves of tree `T`.
 * 
 * assumes that tree has no object-like leaves
 * 
 * @since 0.0.8
 */
export type Leaf<T> =
  T extends Tree<infer U>
    ? U
    : T