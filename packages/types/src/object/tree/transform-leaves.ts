import { Primitive } from "../../primitive"
import { TreeLike } from "./tree"

/**
 * given a tree `T`, changes its leaves from type `LeafType` to type `NewLeafType`
 * 
 * @warning does not recurse on list items
 * 
 * @since 0.0.8
 */
export type MapLeaves<T, NewLeafType, LeafType = Primitive> = {
  [K in keyof T]: T[K] extends LeafType ? NewLeafType
    : T[K] extends Record<string, any> ? MapLeaves<T[K], NewLeafType, LeafType>
    : never
}

/**
 * given a tree `T`, augments its leaves to also allow leaves of type `Additional`
 * 
 * @warning does not recurse on list items
 * 
 * @since 0.0.8
 */
export type AugmentLeaves<T, Additional, LeafType = Primitive> = {
  [K in keyof T]: T[K] extends LeafType ? T[K] | Additional
    : T[K] extends Record<string, any> ? AugmentLeaves<T[K], Additional, LeafType>
    : never
}

/**
 * given a tree `T`, disallows its leaves to be of type `Excluded`
 * 
 * @warning does not recurse on list items
 * 
 * @since 0.0.8
 */
export type ExcludeLeaves<T, Excluded, LeafType = Primitive> = {
  [K in keyof T]: T[K] extends LeafType ? Exclude<T[K], Excluded>
    : T[K] extends TreeLike ? ExcludeLeaves<T[K], Excluded, LeafType>
    : never
}